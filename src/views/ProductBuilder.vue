<template>
    <div>
        <h1>Building Products with Vuejs</h1>
        <h3>Select your features</h3>

        <div class="features">
            <input type="color" id="_background" v-model="contentBackground">
            <label for="_background">Content Background</label>
            <input type="color" id="_fontColor" v-model="fontColor">
            <label for="_fontColor">Font Color</label>
            <input id="_image" type="checkbox" @click="image = !image">
            <label for="_image">Image</label>
            <input id="_title" type="checkbox" @click="title = !title">
            <label for="_title">Title</label>
            <input id="_vendor" type="checkbox" @click="vendor = !vendor">
            <label for="_vendor">Vendor</label>
            <input id="_description" type="checkbox" @click="description = !description">
            <label for="_description">Description</label>
            <input id="_price" type="checkbox" @click="price = !price">
            <label for="_price">Price</label>
            <input id="_buy" type="checkbox" @click="buy = !buy">
            <label for="_buy">Buy Button</label>
            <input v-if="buy" id="_buyBackground" type="color" v-model="buyBackground">
            <label v-if="buy" for="_buyBackground">Button Color</label>
            <button @click="resetColors">Reset Colors</button>
        </div>
        <div class="container" v-if="title || vendor || description || price || buy || image">
            <div v-for="product in post" :key="product.id" class="gallery">
                <div class="content" v-bind:style="{background: contentBackground, color: fontColor}">
                    <img v-if="image" :src="product.images[0].src">
                    <h3 v-if="title">{{product.title.replace(/[sS]tock [pP]hoto/g,"")}}</h3>
                    <h4 v-if="vendor">By: {{product.vendor}}</h4>
                    <p v-bind:style="{color: fontColor}" v-if="description">{{product.body_html | removeHtmlTags }}</p>
                    <h6 v-bind:style="{color: fontColor}" v-if="price">From
                        <span > ${{product.variants[0].price}}</span>
                    </h6>
                    <button v-if="buy" v-bind:style="{background: buyBackground, color: fontColor} ">Buy Now</button>
                </div>
            </div>
        </div>

    </div>

</template>
<style scoped>
    body {
        margin: 0;
        font-family: Nunito Sans;
    }

    h3 {
        text-align: center;
        font-size: 30px;
        margin: 0;
        padding-top: 10px;
    }

    a {
        text-decoration: none;
    }
    .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    }
    .gallery {
        flex-basis: 35%;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin: 50px 0;
    }

    .content {
        width: 90%;
        padding:1rem;
        margin: 15px;
        box-sizing: border-box;
        float: left;
        text-align: center;
        border-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        padding-top: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: .4s;
    }

    .content:hover {
        box-shadow: 0 0 11px rgba(33, 33, 33, .2);
        transform: translate(0px, -8px);
        transition: .6s;
    }

    img {
        object-fit: cover;
        width: 200px;
        height: 200px;
        text-align: center;
        margin: 0 auto;
        display: block;
    }

    p {
        text-align: center;
        color: #b2bec3;
        padding: 0 8px;
    }

    h6 {
        font-size: 26px;
        text-align: center;
        color: #222f3e;
        margin: 0;
    }

    ul {
        list-style-type: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0px;
    }

    li {
        padding: 5px;
    }

    .fa {
        color: #ff9f43;
        font-size: 26px;
        transition: .4s;
    }

    .fa:hover {
        transform: scale(1.3);
        transition: .6s;
    }

    button {
        text-align: center;
        font-size: 24px;
        color: #fff;
        width: 100%;
        padding: 15px;
        border: 0px;
        outline: none;
        cursor: pointer;
        margin-top: 5px;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
</style>
<script>
    export default {
        data() {
            return {
                loading: false,
                post: null,
                image: false,
                title: false,
                vendor: false,
                description: false,
                price: false,
                buy: false,
                buyBackground: '',
                contentBackground: '',
                fontColor: ''

            }
        },
        created() {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData()
        },
        watch: {
            // call again the method if the route changes
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.error = this.post = []
                this.loading = true
                // replace `getPost` with your data fetching util / API wrapper
                Promise.all([fetch('https://backdropstock.com/collections/paint/products.json?limit=5')
                    .then(response => response.json()).then(data =>{
                        for(let i of data.products){
                            this.post.push(i);
                        }
                    })
                    ,fetch('https://backdropstock.com/collections/architecture/products.json?limit=5')
                    .then(response => response.json()).then(data =>{
                        for(let i of data.products){
                            this.post.push(i);
                        }
                        console.log(this.post)
                    }),
                    fetch('https://backdropstock.com/collections/holidays-seasons/products.json?limit=5')
                    .then(response => response.json()).then(data =>{
                        for(let i of data.products){
                            this.post.push(i);
                        }
                        console.log(this.post)
                    })]);

            },
            resetColors(){
                this.fontColor = '',
                this.contentBackground = '',
                this.buyBackground = ''
            }
        },
        filters: {
            removeHtmlTags: function(value){
                return value.replace(/(<.>)|(<\/.>)/g, "")
            }
        }
    }
</script>
