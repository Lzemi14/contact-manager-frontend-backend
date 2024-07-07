const asyncHandler = require("express-async-handler");
const Contact=require('../models/contactmodel');
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getcontacts = asyncHandler(async(req,res)=>{
  const contacts =await Contact.find({ 
    user_id:req.user.id
  });
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createcontact =asyncHandler(async(req,res)=>{
  console.log('the req body is',req.body);
  const {name,email,phone}=req.body;
  if(!name||!email||!phone)
    {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const contact=await Contact.create({
      name,email,phone,user_id : req.user.id
    });
  res.status(201).json(contact);
});

//@desc Get  contact
//@route GET /api/contacts/:id
//@access private
const getcontact =asyncHandler(async(req,res)=>{
  const contact= await Contact.findById(req.params.id);
  if(!contact)
    {
       res.status(404);
       throw new Error("Contact not found");
    }
  res.status(200).json(contact);
}
);
//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updatecontact =asyncHandler(async(req,res)=>{

  const contact= await Contact.findById(req.params.id);
  if(!contact)
    {
       res.status(404);
       throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id)
      {
         res.status(403);
         throw new Error("User dont have permisson to upadate other user's contacts")
      }
  const updatedcontact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new :true}
  );
  res.status(200).json(updatedcontact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deletecontact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  if(contact.user_id.toString()!==req.user.id)
    {
       res.status(403);
       throw new Error("User don't have permisson to delete other user's contacts");
    }
  await Contact.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ message: 'Contact removed' });
});


module.exports={getcontacts,createcontact,getcontact,updatecontact,deletecontact};