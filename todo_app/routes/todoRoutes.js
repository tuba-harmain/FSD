const express = require("express"),
    router = express.Router();

const TodoTask = require("../models/TodoTask");

router.get('/', (req, res) => {
    TodoTask.find({}, (err, tasks) => {
		if (err) {
			return res.status(500);
		}
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

router.post('/', async (req, res) => {
    if (!req.body.content) {
        res.status(400);
        return res.json({ message: "please type a task" })
    }
    const todoTask = new TodoTask({
        content: req.body.content
    });

    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//router.get("/edit/:id", (req, res) => {
router.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => { res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id }); });
}).post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

router.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

module.exports = router;
