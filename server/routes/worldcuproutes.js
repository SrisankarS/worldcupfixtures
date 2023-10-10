const express=require('express');
const worldCupController = require ("../controllers/worldCupController");
const router=express.Router();
router.use(express.json());
// router.post("/addfixtures",worldCupController.addMatchFixtures); //// fixutres data upload (postman)
// router.post("/admin",worldCupController.getAdminDetails); // admin credentials upload (postman)
router.post("/fixtures",worldCupController.checkAdminCredentials); 
router.put("/fixtures/:id",worldCupController.updateMatchResult);
////// User Page
router.get("/pointstable",worldCupController.getPointsTable);
router.get("/fixtures",worldCupController.getFixturesTable);
module.exports=router;