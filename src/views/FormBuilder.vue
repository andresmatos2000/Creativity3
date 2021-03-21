<template>
    <div class="container">
        <h1>Create a form using VueJS</h1>
        <div class="features">
            <h3>Select your features</h3>
            <input type="checkbox" @click="title.bool = !title.bool">
            <label for="_title">Title</label>
            <input v-show="title.bool" v-model="title.content" placeholder="Your title here" id="_title" type="text">
            <br>
            <input id="_firstName" type="checkbox" @click="firstName = !firstName">
            <label for="_firstName">First Name</label>
            <br>
            <input id="_lastName" type="checkbox" @click="lastName = !lastName">
            <label for="_lastName">Last Name</label>
            <br>
            <input id="_email" type="checkbox" @click="email = !email">
            <label for="_email">Email</label>
            
            <br>
            <input id="_phoneNumber" type="checkbox" @click="phoneNumber = !phoneNumber">
            <label for="_phoneNumber">Phone Number</label>
            <br>
            <input id="_message" type="checkbox" @click="message.bool = !message.bool">
            <label for="_message">Message</label>
            <br>
            <input type="checkbox" @click="select.bool = !select.bool">
            <label for="_select">Select</label>
            <input v-show="select.bool" v-model="select.content" id="_select"
                placeholder="Google,Facebook,A friend,Brochure" type="text">
            
        </div>

        <br>
        <div v-if="title.bool || message.bool || select.bool || firstName || lastName || email || phoneNumber" id="formContent">
            <h1 v-if="title.bool == true">{{title.content}}</h1>
            <label v-if="phoneNumber" for="phoneNumber">Phone Number:</label>
            <input v-if="phoneNumber" placeholder="(703)-999-9999" type="tel" name="" id="phoneNumber">
            
            <label v-if="firstName" for="firstName">First Name:</label>
            <input v-if="firstName" id="firstName" type="text">
            
            <label v-if="lastName" for="lastName">Last Name:</label>
            <input v-if="lastName" id="lastName" type="text">
            
            <label v-if="email" for="email">Email:</label>
            <input v-if="email" id="email" type="email">
            <br>
            <label v-if="message.bool" for="message">Message:</label>
            <input v-if="message.bool" id="message" type="textarea">

            <select v-if="select.bool" name="" id="select">
                <option v-for="value in select.array" :key="value" v-bind:value="value">{{value}}</option>
            </select>
            <br>
        </div>
        <button v-if="title.bool || message.bool || select.bool || firstName || lastName || email || phoneNumber" @click="createHTML">Create HTML</button> 
        <div id="embededForm"></div>
    </div>
</template>
<style scoped>
.features{
    text-align:left;
    width:max-content;
    margin: 0 auto;
    
}
#formContent {
    border: 1px solid black;

}
#formContent > *{
    margin:.5rem;
}
#embededForm{
    max-width:50ch;
    margin:1rem auto;
}
    </style>

<script>
    export default ({
        name: "formBuilder",
        data() {
            return {
                title: {
                    bool: false,
                    content: ''
                },
                email: false,
                phoneNumber: false,
                firstName: false,
                lastName: false,
                message: {
                    bool: false,
                    content: ''
                },
                select: {
                    bool: false,
                    content: '',
                    array: []
                },
                formContent: ''
            }
        },
        methods: {
            createHTML(){
                document.querySelector("#embededForm").innerText = document.querySelector("#formContent").innerHTML.replace(/(<!---->)|(data-v-50957a6d="")/g,"");
            }
        },
        computed: {
            selectContent() {
                return this.select.content;
            }
        },
        watch: {
            selectContent() {
                let content = this.select.content;
                if (content.charAt(content.length - 1) == ',') {
                    let str = content.substring(0, content.length - 1);
                    this.select.array = str.split(",");
                } else {
                    this.select.array = content.split(",");
                }
                console.log(this.select.array);
                return this.select.array;
            }
        }
    })
</script>