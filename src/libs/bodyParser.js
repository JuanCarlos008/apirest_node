async function bodyParser(req){
    return new Promise((resolve, reject) => {
        let totalData = "";
        req
            .on("error", err => {
                console.log(err);
                reject();
            })
            .on("data", chunk => {
                totalData += chunk;
            })
            .on("end", () => {
                req.body = JSON.parse(totalData);
                resolve();
            })
    })
}


module.exports = { bodyParser }