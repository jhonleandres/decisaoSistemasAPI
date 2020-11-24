module.exports = app =>{
    
    const save = (req, res) => {
        return res.status(200).send("ok save")
    }
    const get = async (req, res) => {
        return res.status(200).send("ok get")    
    }
    const getById = (req, res) => {
        return res.status(200).send("ok getById")
    }
    return {save, get, getById}
}