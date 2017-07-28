    const F = {
        getLevel: function (req){
                    let easy, hard;
                    if(!req.session.level){
                        req.session.level = 'нормальный';
                    }
                    switch(req.session.level){
                        case "нормальный": easy = true; break;
                        case "сложный": hard = true; break;
                        default: easy = true; break;
                    }
                    let obj = {
                        easyS: easy,
                        hardS: hard
                    };
                    return obj;
                },
        getRegion: function (req){
                if(!req.session.region){
                    req.session.region = 'Европа';
                }
                return req.session.region;
        }
    }

module.exports = F;