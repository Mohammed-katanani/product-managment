let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let totalInputs = document.querySelectorAll(".price input");
let Inputs = document.querySelector(".inputs");
let tbody = document.getElementById("tbody");
let mydeleteAll = document.getElementById("deleteAll");

/// /// /// /// /// /// /// /// /// /// /// /// /// /// /// /// 

totalInputs.forEach(el=>{
    el.addEventListener("change",()=>{
        getTotale()
    })
    el.addEventListener("keydown",()=>{
        getTotale()
    })
})

function getTotale(){
    if(price.value !=""){
        total.innerHTML=(+price.value+ +taxes.value+ +ads.value - discount.value)
        total.style.backgroundColor="#040"
    }else{
        total.innerHTML="";
        total.style.backgroundColor="rgb(158, 58, 58)"
    }
}

let products=localStorage.getItem("products")?JSON.parse(localStorage.getItem("products")):[];

if(localStorage.id==undefined){
    localStorage.id=1; 
}
create()
function create(){
    submit.onclick = ()=>{
        let myproduct ={
            id:localStorage.id++,
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            category:category.value.toLowerCase(),
        }
        if(count.value<100&&title.value!=""&&category.value!=""){
            if(count.value > 0 ){
                for (let i = 0; i < count.value; i++) {
                    products.push(
                        {
                            id:localStorage.id++,
                            title:title.value.toLowerCase(),
                            price:price.value,
                            taxes:taxes.value,
                            ads:ads.value,
                            discount:discount.value,
                            total:total.innerHTML,
                            category:category.value.toLowerCase(),
                        }
                    );            
                }
            }else{
                products.push(myproduct);   
            }
            localStorage.setItem("products",JSON.stringify(products))
            clearData()
            addData()
            deletItem()
            showDeleteAll()
            updateItem()
            create()
        }
    }

}

function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    category.value="";
    count.value="";
    total.style.backgroundColor="rgb(158, 58, 58)"
}
if(localStorage.id==undefined){
    localStorage.id=1; 
}

function addData(){
    let body="";
    let i=0;
    products.forEach(el=>{
        // console.log(el)
        body+=`
        <tr>
        <td>${el.id}</td>
        <td>${el.title}</td>
        <td>${el.price}</td>
        <td>${el.taxes}</td>
        <td>${el.ads}</td>
        <td>${el.discount}</td>
        <td>${el.total}</td>
        <td>${el.category}</td>
        <td><button  class="update" data-index="${i}">update</button></td>
        <td><button  class="delete" data-index="${i++}">delete</button></td>
        </tr>
        `;
    })
    
    tbody.innerHTML=body
    
}
addData()
function deletItem(){
    let mydelete = document.querySelectorAll(".delete");

    mydelete.forEach(el=>{
        el.addEventListener('click',()=>{
            products.splice(el.dataset.index,1);
            localStorage.products= JSON.stringify(products) 
            el.parentElement.parentElement.remove()
            showDeleteAll()
        })
    })

    }
    deletItem()
    
    function showDeleteAll(){
        if(products.length > 0){
            mydeleteAll.innerHTML =`<button id="mydelete">Delete All ${products.length}</button>`;
            DeletAll()
        }else{
            mydeleteAll.innerHTML =``
        }
}
showDeleteAll()
function DeletAll(){
    let mydelete = document.getElementById("mydelete");
    // console.log(mydelete)
    mydelete.onclick = ()=>{
        products=[];
        localStorage.products=[]
        tbody.innerHTML=""
        showDeleteAll()
    }
}


function updateItem(){
    let myupdate = document.querySelectorAll(".update");    
    myupdate.forEach(el=>{
        el.addEventListener('click',()=>{
        let index = el.dataset.index ;
        let row = el.parentElement.parentElement;
        submit.innerHTML="update"
        title.value=products[index].title;
        price.value=products[index].price;
        taxes.value=products[index].taxes;
        ads.value=products[index].ads;
        discount.value=products[index].discount;
        getTotale()
        category.value=products[index].category;

        count.style.display="none"

        scroll({
            top:0,
            behavior:"smooth"
        })
        submit.onclick = ()=>{
            row.innerHTML=`
            <tr>
            <td>${products[index].id}</td>
            <td>${title.value}</td>
            <td>${price.value}</td>
            <td>${taxes.value}</td>
            <td>${ads.value}</td>
            <td>${discount.value}</td>
            <td>${total.innerHTML}</td>
            <td>${category.value}</td>
            <td><button  class="update" data-index="${index}">update</button></td>
            <td><button  class="delete" data-index="${index}">delete</button></td>
            </tr>
            `
            products[index].title=title.value
            products[index].price=price.value
            products[index].taxes=taxes.value
            products[index].ads=ads.value
            products[index].discount=discount.value
            products[index].total=total.innerHTML
            products[index].category=category.value
            
            localStorage.products=JSON.stringify(products)  
            clearData();
            count.style.display="block";
            submit.innerHTML="create"
            updateItem()
            create()
        }
        })
    })}
    updateItem()




/// /// /// /// /// /// /// search /// /// /// /// /// /// /// /// 

searchCategory.addEventListener("click",(el)=> searchm(el.target.id))
searchTitle.addEventListener("click",(el)=> searchm(el.target.id))
let searchMood;
function searchm(mood){
if(mood==="searchCategory"){
    searchMood="category"
}else{
    searchMood="title"
}
search.style.display="block"
search.focus()
search.addEventListener("keyup",(el)=> searchv(el.target.value))

}

function searchv(value){
    let body =""
    i=0;
products.forEach((el)=>{
    if(el[searchMood].includes(value.toLowerCase())){
        body+=`
        <tr>
        <td>${el.id}</td>
        <td>${el.title}</td>
        <td>${el.price}</td>
        <td>${el.taxes}</td>
        <td>${el.ads}</td>
        <td>${el.discount}</td>
        <td>${el.total}</td>
        <td>${el.category}</td>
        <td><button  class="update" data-index="${i}">update</button></td>
        <td><button  class="delete" data-index="${i++}">delete</button></td>
        </tr>
        `;
    }
})
tbody.innerHTML=body
}
