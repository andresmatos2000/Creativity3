<template>
    <div>Calendar
        <input v-model="date" type="date">
        <label for="task"></label>
        <input v-model="task" id="task" type="text">
        <button @click="addTask">Add Task</button>
        <div class="dataWrapper">
            <div class="data" v-for="item in allTasks" :key="item.date + 1">
                <div v-for="task in item.tasks" :key="task.task">
                    <div v-if="item.date == date">
                    <button @click="completeTask(task.task)">Complete Task</button>
                    <button @click="removeTask(task.task)">Remove Task</button>
                    <span v-bind:class="{complete : task.completed}">{{task.task}}</span>
                    </div>
                </div>
            </div>
        </div>
        <button @click="removeAllCompleted(date)">Remove completed</button>
        <button @click="createMockData">Create Mock Data for this date</button>

    </div>




</template>

<script>
    export default {
        data() {
            return {
                allTasks: [],
                task: '',
                date: '',
                mock: ''
            }
        },
        methods: {
            addTask() {
                if (this.date == "")
                return alert("Please pick a date!")
                if(this.task == "")
                return alert("Please write a task!")
                const found = this.allTasks.findIndex(element => {
                    return element.date == this.date
                })
                //alert(found)
                if (found == -1) {
                    this.allTasks.push({
                        date: this.date,
                        tasks: [{task: this.task, completed: false}],
                        createdMockData: false
                    });
                    //console.log(this.allTasks)
                } else {
                    if (!this.allTasks[found].tasks.find(element =>{return element.task == this.task
                    })){
                        this.allTasks[found].tasks.push({task: this.task, completed: false})}
                }

            },
            removeTask(val) {
                const date = this.allTasks.findIndex(element => {
                    return element.date == this.date;
                })
                const found = this.allTasks[date].tasks.findIndex(element =>{
                    return element.task == val
                    })
                if (found != -1) {
                    this.allTasks[date].tasks.splice(found, 1)
                }
            },
            completeTask(val) {
                const date = this.allTasks.findIndex(element => {
                    return element.date == this.date;
                })
                const found = this.allTasks[date].tasks.findIndex(element =>{
                    return element.task == val
                    })
                if (found != -1) {
                    this.allTasks[date].tasks[found].completed = true;
                }
            },
            removeAllCompleted(val){
                const date = this.allTasks.findIndex(element => {
                    return element.date == val;
                })

                const results = this.allTasks[date].tasks.filter(element => {return element.completed != true});
                 console.log(results);
                 console.log(this.allTasks[date])
                //console.log(this.allTasks, "before set");
                this.allTasks[date].tasks = results;

            },
            createMockData(){
                if (this.date == "")
                return alert("Please pick a date!")
            let data = [{task: "Go on a run", completed:false},{task: "Eat food", completed:false},{task: "Go to the movies", completed:false},{task: "Eatch Lunch with Bob", completed:false},
            {task: "Having dinner with Mom", completed:false},{task: "Do homework", completed:false},{task: "Play soccer", completed:false},{task: "Visit Grandma", completed:false}];
                
                const date = this.allTasks.findIndex(element => {
                    return element.date == this.date;
                })
                if(this.allTasks[date] == undefined){
                    let holder = {date:this.date, tasks:data, createdMockData: true}
                    this.allTasks.push(holder)
                    this.allTasks[date].createdMockData == true;
                }else {
                    if(this.allTasks[date].createdMockData == true){
                        alert("You can only create mock data once per date");
                    }
                    else{
                        data.forEach(element => {
                        this.allTasks[date].tasks.push(element)
                        })
                    this.allTasks[date].createdMockData = true;
                    }
                }

            }
        }
    }
</script>

<style>
.complete {
    color:green;
}
.dataWrapper {
    margin: 2rem auto;
}
.data {
    text-align:left;
}
div > * {
    margin:.1rem;
}
</style>