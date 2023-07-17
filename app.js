const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const tasks = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser({extended: false}));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/tasks', (req, res, next) => {
    res.render('tasks', {task: tasks});
});

app.post('/add-task', (req, res, next) => {
    const taskId = tasks.length + 1;
    const taskName = req.body.task;
    tasks.push({taskId: taskId, taskName: taskName});
    res.redirect('/tasks');
});

app.post('/del', (req, res, next) => {
    var toBeDel = parseInt(req.body.taskToDel); //The body parser reads the taskId as a string. Conversion to int is required.
    
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId === toBeDel) {
        tasks.splice(i, 1);
        break; 
      }
    }
    res.redirect('/tasks');
  });

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
});


app.listen(3000);
