import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    let reactComp = "";
    res.status(200).render('pages/index', {reactApp: reactComp});
});

export default router;
