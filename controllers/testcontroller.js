const testController = (req, res)=>{
    try {
        res.status(200).send({
            success: true,
            message: "The tesing of the data is correct with test route"
        });
    } catch (error) {
        console.log("The error in testing the route", error);
    }
};


export {testController};