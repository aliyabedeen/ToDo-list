import  express  from "express";
import methodOverride from "method-override";
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const tasks = [];

app.get("/", (req, res) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January","February","March","April","May","June","July",
                        "August","September","October","November","December"];
    const date = new Date();
    let day = dayNames[date.getDay()];
    let month = monthNames[date.getMonth()];
    let year = date.getFullYear();
    let currentDate = `${day}, ${month} ${year}`;
    res.render("index.ejs", {
        todayDate: currentDate,
        tasks
    });
});

app.post("/addTask", (req, res) => {
    const newTask= req.body.newTask.trim();  
    if (newTask == " ") {
        return;
    }
    else {
        tasks.push(newTask);
        res.redirect("/");
    }       
});

app.delete('/deleteTask/:index', (req, res) => {
    const index = req.params.index;

    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.redirect('/');
    } else {
        res.status(404).send('Task not found');
    }
});

app.get("/work", (req, res) => {
    const newTask= req.body.newTask;  
    if (newTask == " ") {
        return;
    }
    else {
        tasks.push(newTask);
        res.redirect("/");
    }
    const title = "Week List";
    res.render("index.ejs", { 
        text : title
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
