import { fontSize, fontWeight } from "@mui/system";
import api from "../../api";

function StockInfoBlock(props) {
    const {data} = props;
    const symbol = data[0]
    const name = data[1]
    const exchange = data[2]
    const asset_type = data[3]

    return (
        <>
            <div class='mt-2'>
                <div>
                    <div class='d-inline-block'>
                        <h5>{name} ({symbol})</h5>
                    </div>
                    <div class='d-inline-block ms-3'>
                        <small class="text-muted">asset type: {asset_type}</small>
                    </div>
                </div>
                <div>
                    traded in: {exchange}
                </div>
            </div>
        </>
    );
}

export default StockInfoBlock;