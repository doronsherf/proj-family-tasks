let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let app = express()

app.use(express.json())
app.use(cors())

// Connecting to the database
mongoose.connect('mongodb://localhost:27017/family',
 { useNewUrlParser: true, useUnifiedTopology: true })
    .then(_ => console.log("OK: Connected to mongoDB:'family' at: " + new Date()  ))
    .catch(err => {
		console.log("ERROR! MongoDB connection error:");
		console.log(err);
		process.exit();
	})

// 3 Schema types: 1.family member 2.a task 3.a number- to be used as the bigest task_numbr that is exist  
let FamilySchema = new mongoose.Schema({
    famid:Number,
    name:String,
	nick:String,
	role:String
})


let tasksSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	//_id: String,
	task_numbr:Number,
    descrptn:String,
	created:Date,
	hendler:String,
	to_del:Boolean
})
/*
let tasksCountSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	max_tsk_nmbr:Number
})
*/

let familyModel = mongoose.model('familymembers',  FamilySchema)//

let tasksModel = mongoose.model('tasksCollection', tasksSchema)

// let tasksCountModel = mongoose.model('tasksCountCollection', tasksCountSchema)

//GET ALL FAMILY MEMBERS
app.get('/all_fam', (req, resp) => {
    familyModel.find()
    .then(data=>{
		resp.json(data)
		console.log('Family Members Retreived!');

    })
})


//GET ALL TASKS
app.get('/all_tasks', (req, resp) => {
    tasksModel.find()
    .then(tasks =>{
        console.log('All Tasks Retreived!');
		resp.send(tasks);//present the response body on the html page exactly like: 'resp.json(tasks);'
		//max_num_fnc()
	})
	.catch(err =>{
		console.log('MongoDB ERROR');
			console.log(error);// error details written also on console
			resp.json(error); // whithout json(error), error details are not sent properly 
	});
})

// GET A Family member (not used)
app.get('/fam_membr', (req, resp) => {
	familyModel.find({'famid':2})  // db.familymembers.find({"famid":3})
	.then(data=>{
		console.log(data)
		res.json(data)
		//console.log(res.json(data) ); 
		
	})
})


// GET 1 TASK (WORK OK, not used)
app.get('/task/:id', (req, resp) => {
	tasksModel.findById(req.params.id) 
	.then(result =>{
		console.log('Task Retreived  ');
		resp.send(result);
		//max_num_fnc() 
	})
	.catch(err =>{ 
		console.log(err);
	 	resp.json(err); 
	// 	//process.exit();// 
	});
})



// ADD NEW TASK: (Rout:POST)
app.post('/new_task', (req, resp) => {
	console.log('request.body: ' , req.body)
    let task = new tasksModel({ 
		_id: mongoose.Types.ObjectId(),
		task_numbr:req.body.task_numbr, 
		descrptn:req.body.descrptn , 
		created:req.body.created, 
		hendler:req.body.hendler,
		to_del:req.body.to_del
	} );
	task.save()
		.then(result =>{
			resp.json({msg:"task was added to DB" , task_details:task, ID:task._id}),
			console.log("Task was added")
			//max_num_fnc();
		}) 
		.catch(error =>{
			console.log('MongoDB ERROR ');
			console.log(error);// error details written also on console
			resp.json(error); // whithout json(error) do not send eroor details
		})
	.catch(err =>{ 
		console.log(err);
		resp.json(err); // whithout json(err) do not send error details
		//process.exit();// 
	});
})

// DELETE A TASK  WORKING !!!(stage1:find stage2:delete)
app.get('/del/:id', (req, resp) => {
	tasksModel.findById(req.params.id) 
	.then(result =>{
		console.log('Task found!!!');

		result.deleteOne({ _id: req.params.id }) 
				.then(result2 =>{
					console.log('A Task Deleted !!!');
					resp.send({msg:"Task was Deleted from DB" , task_details:result2});
					//max_num_fnc() 
				})
				.catch(err =>{ 
					//console.log(err);
					resp.json(err);
					//process.exit();
				});
	})	
	.catch(err =>{ 
		console.log(err);
		resp.json(err); // whithout json(err) do not send error details
		//process.exit();// 
	});
	
})

/* ******************************************************* */

/*
// Max Number: to be used as the bigest task_numbr that is exist   
let max_num_var = 
	tasksModel.find()
		.sort({_id: -1})
		.limit(1)
		.then(max_num => {
			console.log(max_num);
			console.log(max_num[0].task_numbr);
			//resp.json(max_num);
			//return max_num;
		});
/*
/*max_tsk_nmbr work with undefined return
function max_num_fnc() { 
let max_num_var;
let max_num_arr; 

max_num_arr = tasksModel.find().sort({_id: -1}).limit(1);
max_num_var = max_num_arr[0]; 



console.log('maxarr');
console.log(max_num_arr);

console.log('maxV');
console.log(max_num_var);
return max_num_var
}
*/

/*
	app.put('/new_max_nmbr', (req, resp) => {
		console.log(req.body)
		let task = new tasksModel({ taskid, descrptn, created, hendler}=req.body)
		task.save()
		res.json({msg:"task was added"})
	})
*/	

/*
app.get('/max_tsk_nmbr', (req, resp) => {
    tasksCountModel.find()
    .then(data=>{
        console.log(data)
        res.json(data)
    })
})
*/
/**********************************************************/


/*
app.post('/rnew_max_nmbr', (req, resp) => {
	console.log(req.body)
	let max_nmbr = new tasksCountModel({max_tsk_nmbr}=req.body)
	max_nmbr.save()
	res.json({msg:"max task number was replaced"})
})
*/


/*
tasksSchema.post('save', (function () {
	console.log(this.tasksModel.created);
	this.tasksModel.created = Date.now();
	console.log(this.tasksModel.created);
}))  
*/

/*  
http://localhost:3000/new_task
{"taskid": 6 ,
"descrptn":"wash dark fabrics",
"created": "02/02/2019",
"hendler": "pah"
}
*/
/* 
db.getCollection('taskscollections').find({"task_numbr":  4   })
db.getCollection('familymembers').find({"famid":3})
db.familymembers.find({"famid":3})
db.getCollection('taskscollections').find({"task_numbr":  { $gt: 8 }   })



try {
	db.taskscollections.deleteMany( {"task_numbr":  { $gt: 8 } } );
} catch (e) {
   print (e);
}
*/

app.listen(3000, _ => console.log("server started on port 3000"))
