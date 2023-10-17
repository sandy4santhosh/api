function scrollbottom() {
    chatarea.scrollTo(0, chatarea.scrollHeight)
}
function isValid(value){
    let text =value.replace(/\n/g,'')
    text = text.replace( /\s/g)
    return text.length > 0 ;
}
// for togg
const click1 = document.querySelector('.res-icon')
const view = document.querySelector('.container')
click1.addEventListener('click',() => {
    view.classList.toggle('showme')
})
// for textarea auto adjust
const textarea = document.querySelector('.text-input-msg');
textarea.style.cssText = `height: ${textarea.scrollHeight}px; overflow-y: hidden`;
textarea.addEventListener('input', function(){
    this.style.height ='35px';
    this.style.height =`${this.scrollHeight}px`;
})
// footer form
const chatform = document.querySelector('.input-form');
textarea.addEventListener('input',function(){
    let line= textarea.value.split('\n').length;
    if (textarea.rows < 6 || line < 6){
        textarea.rows = line;}
    if (textarea.rows > 1 ){
        chatform.style.align = 'flex-end'
    }
    else{
        chatform.style.align = 'center' 
    }
 })
 function textupp(){
    const texval= textarea.value.toUpperCase()
    return texval;
    }  
// message send 
const initmsg = document.querySelector('.initmsg')
const chatarea = document.querySelector('.chat-area')
const chatmsgdis = document.getElementById('btn');
const arr =['name','age','DOB','currentlocation'];
let arr1 = []
let arrcount = 0
chatmsgdis.addEventListener('click', function(e){
    let tag_val = document.querySelectorAll('.msg-recive > p ')
    e.preventDefault()
    if (isValid(textarea.value) && (textarea.value === 'create'|| arr.includes(tag_val[arrcount].textContent))){
        for (let i =0; i < 4;i++){
            // if (isValid(textarea.value))
            writtenmsg()
            create()
        }
        writtenmsg()
        create1()
        // if (arr1.length < 4){
        //     writtenmsg()
        //     create()
        // }
        // else {
        //     console.log('hi')
        //     writtenmsg()
        //     create1()
        // }
    }
    else if(isValid(textarea.value)){
        writtenmsg()
        setTimeout(autoreply(),900)
    }
})
function create(){
    let tag_val1 = document.querySelectorAll('.msg-sent > p ')
    chatarea.insertAdjacentHTML('beforeend',`<div class="msg-recive">
        <p >${arr[arrcount]}</p>
        </div>`)
    console.log(arrcount)
    console.log(tag_val1)
    arr1.push(tag_val1[arrcount].textContent)
    arrcount ++ 
    textarea.focus()
    textarea.rows = 1
    textarea.value = ''
    scrollbottom()
    
}
function create1(){
    console.log(arr1)
    fetch('http://127.0.0.1:5000/create',{
            method: 'POST',
            body: JSON.stringify({
                'name': arr1[0],
                'age': arr1[1],
                'DOB': arr1[2],
                'currentlocation': arr1[3]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>(res.json())).then(data=> chatarea.insertAdjacentHTML('beforeend',`<div class="msg-recive">
        <p>${data['result']}</p>
        </div>`))
        .catch(err=>console.log(err))
    chatarea.scrollTo(0, chatarea.scrollHeight)
    textarea.focus()
    textarea.rows = 1
    textarea.value = ''
    textupp()
    arr1.length = 0;

}
// autoreply
function autoreply(){
    let txt = textarea.value
    fetch('http://127.0.0.1:5000/process_data',{
            method: 'POST',
            body: JSON.stringify({txt}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>(res.json())).then(data=> chatarea.insertAdjacentHTML('beforeend',`<div class="msg-recive">
        <p>${data['result']}</p>
        </div>`))
    .catch(err=>console.log(err))
    chatarea.scrollTo(0, chatarea.scrollHeight)
    textarea.focus()
    textarea.rows = 1
    textarea.value = ''
    textupp()
    // initmsg.style.display = 'none'
}
// recivemsg
function writtenmsg(){
    let message = `<div class="msg-sent">
                        <p>${textarea.value.trim().replace(/\n/g,'<br>\n')}</p>
                    </div>`
    // console.log(message)
    chatarea.insertAdjacentHTML('beforeend',message)
    let tag_val = document.querySelectorAll('.msg-sent > p ')
    textarea.focus()
    textarea.rows = 1
    // initmsg.style.display = 'none'
    scrollbottom()
    console.log(arr1)
    if (arr1.length === 4){
        arr1.shift()
        arr1.push(tag_val[4].textContent)
    }
}
