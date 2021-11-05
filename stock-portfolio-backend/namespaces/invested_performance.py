from flask import request
from flask_restplus import Resource, abort
from app import api, db
from util.models import portfolio_performance_model, portfolio_performance_response_model
from util.database import *
from util.alpha_vantage_feed import dc

import json

invested_performance = api.namespace('invested_performance', description='Stats on performance of overall invested stocks')

@invested_performance.route('/', doc={
    "description": "Allows user to retrieve their performance stats across all portfolios"
})
@invested_performance.param('token', description="The user's token", type=str, required=True)
class GetInvestedPerformance(Resource):
    def get(self):
        """
        Returns a JSON object containing the performance stats of the user's invested stocks from time of adding to portfolio
        """

        token = request.args.get("token")

        # Find user
        user = get_user_by_value("active_token", token)
        # Get the user's invested stocks
        all_portfolios = all_portfolios_from_user(user['username'])

        # Get all of user's holdings
        all_holdings = []
        for portfolio in all_portfolios:
            holdings = get_holdings(portfolio['portfolio_id'])

            for holding in holdings:
                if holding not in all_holdings:
                    all_holdings.append(holding)

        total_gains = 0
        pct_performance = 0
        curr_price = 0
        old_price = 0

        print(user)
        print(all_portfolios)
        print(all_holdings)

        for holding in all_holdings:
            print(holding)
            # Get the current price of the stock
            curr_price += float(dc.ts.get_quote_endpoint(holding['symbol'])[0]['05. price'])

            # Get the old price of the stock
            old_price += holding['value']

            # Calculate the performance of the stock
            pct_performance = (curr_price - old_price) / old_price
            total_gains += (curr_price - old_price) * holding['qty']

        return {
            'total_gains': total_gains,
            'pct_performance': pct_performance,
        }

@invested_performance.route('/portfolio', doc={
    "description": "Allows user to retrieve their performance stats for a particular portfolio"
})
@invested_performance.param('portfolio', description="Portfolio ID", type=str, required=True)
class GetPortfolioPerformance(Resource):
    @invested_performance.response(200, 'Success', portfolio_performance_response_model)
    def get(self):
        """
        Returns a JSON object containing the performance stats of the user's invested stocks
        """
        body = request.json
        portfolio_id = request.args.get('portfolio')

        import sys
        print(portfolio_id, file=sys.stderr)
        # Get holdings for the particular portfolio
        portfolio_holdings = get_holdings(portfolio_id)

        perf_results = []
        orig_overall = 0
        curr_overall = 0

        # for each holding calculate the change in price
        if len(portfolio_holdings) != 0:
            for holding in portfolio_holdings:
                # find out the most recent price of the stock
                ts_data = dc.ts.get_quote_endpoint(holding['symbol'])[0]
                curr_price = ts_data["05. price"]

                delta = float(curr_price) - holding['value']

                perf_results.append({
                    'symbol': holding['symbol'],
                    'orig_price': holding['value'],
                    'curr_price': holding['value'],
                    'change_val': delta * holding['qty'],
                    'change-percent': delta / holding['value'],
                })

                orig_overall += holding['value'] * holding['qty']
                curr_overall += curr_price * holding['qty']

            # calculate overall change
            overall_delta = curr_overall - orig_overall

            perf_results.append({
                'symbol': 'overall',
                'orig_price': orig_overall,
                'curr_price': curr_overall,
                'change_val': overall_delta,
                'change-percent': overall_delta / orig_overall,
            })

        return {
            'symbols': perf_results
        }