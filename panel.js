const panelSchema1 = require("./../schema/panelSchema");
const jwt = require("jsonwebtoken");
const axios = require('axios')
// Display the List Of panel when URL consists of api panel
getPanel = async (req, res) => {
  console.log(req.cookies)
    axios.get('http://localhost:8080/user/validate', {
      
        headers: {
       
            Cookie: "auth-token=" + req.cookies['auth-token']
        }
    }).then(response => {
        res.send("Got panel");
    }).catch(err => {
        res.status(400).send("error occured")
    })
};

getPanelBySkills = async (req, res) => {
    //create validations here
    axios.get('http://localhost:8080/user/validate', {
        headers: {
            Cookie: "auth-token=" + req.cookies['auth-token']
        }
    }).then(response => {
        //logic for getPanelBySkills

        if (response.data.role == '') {
            panelSchema1.find({ skills: req.params.skills }, function (err, result) {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        result,
                    });
                }
            });

        }

    }).catch(err => {
        res.status(403).send("error occured")
    })
};

getPanelByID = async (req, res) => {
    //create validations here
    axios.get('http://localhost:8080/user/validate', {
        headers: {
            Cookie: "auth-token=" + req.cookies['auth-token']
        }
    }).then(response => {
        //logic for getPanelBySkills

            console.log(response)
            console.log(req.params.panelId)
            panelSchema1.findOne({ panelId: req.params.panelId }, function (err, result) {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.json({
                        result,
                    });
                }
            });

        

    }).catch(err => {
        res.status(403).send("error occured")
    })
};

//CREATE Request Handler
//CREATE New panel Information
createPanel = async (req, res) => {
     
    axios.get('http://localhost:8080/user/validate', {
        headers: {
            Cookie: "auth-token=" + req.cookies['auth-token']
        }
    }).then(response => {
        //logic for getPanelBySkills

        const panelinfo = new panelSchema1(req.body);
        console.log('body='+req.body)
        panelinfo.save().then(() => {
            console.log(panelinfo)
            res.status(201).send(panelinfo);
        });
    }).catch(err => {
        res.status(403).send("error occured")
    })
};

//Update Request Handler
// Update Existing panel Information

const updatePanel = (req, res) => {
    axios.get('http://localhost:8080/user/validate', {
        headers: {
            Cookie: "auth-token=" + req.cookies['auth-token']
        }
    }).then(response => {
        //logic for getPanelBySkills

        panelSchema1.find({ panelId: req.params.panelId }, function (err, result) {
            if (err) throw err;
            if (!result) {
                res.json({
                    message: "Panel with id: " + req.params.panelId + " not found.",
                });
            }
            else {
                result.panelId = req.body.panelId;
                result.panelName = req.body.panelName;
                result.skills = req.body.skills;
                result.Interviewer = req.body.Interviewer;
                result.Active = req.body.Active;
                result.BookedStatus = req.body.BookedStatus;
                result.save(function (err, result) {
                    if (err) throw err;
                    res.json({
                        message: "Successfully updated the panel",
                        panelSchema: result,
                    });
                });
            }
        });
    }).catch(err => {
        res.status(400).send("error occured")
    })
}
//Delete Request Handler
// Delete panel Details
const deletePanel = (req, res) => {
    axios.get('http://localhost:8080/user/validate', {
        headers: {
            Cookie: "auth-token=" + req.cookies['auth-token']
        }
    }).then(response => {
        //logic for getPanelBySkills
        if (response == null) {
            res.json({
                message: "No panel found",
            });
        }
        panelSchema1.findOneAndRemove(
            { panelId: req.params.panelId },
            function (err, result) {
                if (result == null) {
                    res.json({
                        message: "No panel found",
                    });
                }
                else {
                    res.json({
                        message: "Successfully deleted the panel",
                        panelSchema: result,
                    });
                }
            });


    }).catch(err => {
        res.status(400).send("error occured")
    })
}
module.exports = {
    getPanel,
    getPanelBySkills,
    createPanel,
    getPanelByID,
    updatePanel,
    deletePanel,
};


// const panelSchema1 = require("./../schema/panelSchema");
// const jwt = require("jsonwebtoken");
// const { response } = require("../server");
// const verify = require("./../Middleware/auth.js");
// const axios = require('axios')
// // Display the List Of panel when URL consists of api panel
// // getPanel = async (req, res) => {
// //     axios.get('http://localhost:8080/user/validate', {
// //         headers: {
// //             Cookie: "auth-token=" + req.cookies['auth-token']
// //         }
// //     }).then(response => {
// //         if(response.userRole=='Panelist')
// //         {
// //           res.send("Panelist Login")
// //         }
// //     }).catch(err => {
// //         res.status(400).send("error occured")
// //     })
// // };


// // Display the List Of panel when URL consists of api panel
// getPanel = verify.verifyToken, async (req, res) => {
//   if (!user) {
//     res.status(403)
//       .send({
//         message: "Invalid JWT token"
//       });
//   }
//   const getPanel = await panelSchema1.find();
//   jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         getPanel
//       });
//     }
//   });
// };

// getPanelBySkills = async (req, res) => {
//   //create validations here
//   panelSchema1.find({ skills: req.params.skills }, function (err, result) {
//     if (err) throw err;
//     jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
//       if (err) {
//         res.sendStatus(403);
//       } else {
//         res.json({
//           result,
//         });
//       }
//     });
//   });
// };

// //CREATE Request Handler
// //CREATE New panel Information
// createPanel = async (req, res) => {
//   //const { error } = validatepanel(req.body);
//   //if (error){
//   //res.status(400).send(error.details[0].message)
//   //return;
//   //};
//   //Increment the panel id
//   const panelinfo = new panelSchema1(req.body);

//   jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       panelinfo.save().then(() => {
//         res.status(201).send(panelinfo);
//       });
//     }
//   });
// };

// //Update Request Handler
// // Update Existing panel Information
// function updatePanel(req, res) {
//   const updatePanel = new panelSchema1(req.body);
//   panelSchema1.findOne({ panelId: req.params.panelId }, function (err, result) {
//     if (err) throw err;
//     if (!result) {
//       res.json({
//         message: "Panel with id: " + req.params.panelId + " not found.",
//       });
//     }
//     jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
//       if (err) {
//         res.sendStatus(403);
//       } else {
//         if(req.body.panelId==null)
//         {
//             result.panelId = result.panelId;
//         }
//         if(req.body.panelName==null)
//         {
//             result.panelName = result.panelName;
//         }
//         if(req.body.skills==null)
//         {
//             result.skills = result.skills;
//         }
//         if(req.body.Interviewer==null)
//         {
//             result.Interviewer = result.Interviewer;
//         }
//         if(req.body.Active==null)
//         {
//             result.Active = result.Active;
//         }
//         if(req.body.BookedStatus==null)
//         {
//             result.BookedStatus = result.BookedStatus;
//         }
//         if(req.body.panelId!=null)
//         {
//             res.json({
//               message : 'You cannot change Panel Id'
//             })
//         }
//         if(req.body.panelName!=null)
//         {
//           result.panelName = req.body.panelName;
//         }
//         if(req.body.skills!=null)
//         {
//           result.skills = req.body.skills;        
//         }
//         if(req.body.Interviewer!=null)
//         {
//           result.Interviewer = req.body.Interviewer;
//         }
//         if(req.body.Active!=null)
//         {
//           result.Active = req.body.Active;
//         }
//         if(req.body.BookedStatus!=null)
//         {
//           result.BookedStatus = req.body.BookedStatus;
//         }
        
        
//         result.save(function (err, result1) {
//           if (err) throw err;
//           res.json({
//             message: "Successfully updated the panel",
//             panelSchema1: result1,
//           });
//         });
//       }
//     });
//   });
// }
// //Delete Request Handler
// // Delete panel Details
// function deletePanel(req, res) {
//   panelSchema1.findOneAndRemove(
//     { panelId: req.params.panelId },
//     function (err, result) {
//       jwt.verify(req.token, process.env.TOKEN_KEY, (err, authData) => {
//         if (err) {
//           res.sendStatus(403);
//         } else if (result == null) {
//           res.json({
//             message: "No panel found",
//           });
//         }
//         {
//           res.json({
//             message: "Successfully deleted the panel",
//             panelSchema: result,
//           });
//         }
//       });
//     }
//   );
// }
// module.exports = {
//   getPanel,
//   getPanelBySkills,
//   createPanel,
//   updatePanel,
//   deletePanel,
// };
