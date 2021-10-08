import NavBar from "../NavBar";
function MainPage(){
    return (
        <div>
            <div className="navBar">
                <NavBar/>
            </div>

            <div className="mainContents">
                <p>Some contents here</p>
            </div>

            <div className="footer">
                <p>Some footer here</p>
            </div>
        </div>
    );
}
export default MainPage;