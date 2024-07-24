const BaseballScoreboard = ({homeScore = 0,
    inning = 0,
    outs = 0,
    awayScore = 0,
    balls = 0,
    strikes = 0}) => {
    
    return (
        
        <section className="mt-40 container w-full justify-between items-center mx-auto">
            <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-2 gap-60">
                    <div className="text-lg font-semibold mb-4">Home</div>
                    <div className="text-lg font-semibold mb-4">{homeScore}</div>
                </div>
                <div className="grid grid-cols-2 gap-60">
                    <div className="text-lg font-semibold mb-4">Away</div>
                    <div className="text-lg font-semibold mb-4">{awayScore}</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="grid grid-cols-2 gap-22">
                    <div className="text-lg font-semibold mb-4">Inning</div>
                    <div className="text-lg font-semibold mb-4">{inning}</div>
                    <div className="text-lg font-semibold mb-4">Outs</div>
                    <div className="text-lg font-semibold mb-4">{outs}</div>
                </div>
                <div className="grid grid-cols-2 gap-22">
                    <div className="text-lg font-semibold mb-4">Balls</div>
                    <div className="text-lg font-semibold mb-4">{balls}</div>
                    <div className="text-lg font-semibold mb-4">Strikes</div>
                    <div className="text-lg font-semibold mb-4">{strikes}</div>
                </div>
            </div>
        </section>
    );
};

export default BaseballScoreboard;
