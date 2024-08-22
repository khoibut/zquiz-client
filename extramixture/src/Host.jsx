import "./host-page.css"
function Host() {
    return (
        <>
            <div className="game-id">
                Go to hw.zquiz.com and enter game ID.    You can view the ID again in reports.
                <div className="game-id-number">{new URLSearchParams(window.location.search).get("id")}

                </div>
            </div>
        </>
    )
}
export default Host;