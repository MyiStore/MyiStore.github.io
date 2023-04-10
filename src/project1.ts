// adaptation changes
let nav_bar_block = document.querySelector('.navigation_bar') as HTMLDivElement;
let nav_bar_to_change = nav_bar_block.childNodes[1] as HTMLElement;
 
if(window.innerWidth < 998){
    nav_bar_to_change.classList.remove('container');
    nav_bar_to_change.classList.add('container-fluid');
}

window.addEventListener('resize', ()=>{
    if(window.innerWidth < 998){
        nav_bar_to_change.classList.remove('container');
        nav_bar_to_change.classList.add('container-fluid');
    }
    else if(window.innerWidth > 998){
        nav_bar_to_change.classList.remove('container-fluid');
        nav_bar_to_change.classList.add('container');
    }
})

let header_ul_list_to_remove = Array.from(document.getElementsByClassName('header_li_set_nav_bar') as HTMLCollectionOf<HTMLLIElement>);

window.addEventListener('resize', ()=>{
    if(window.innerWidth < 1369){
        header_ul_list_to_remove[10].style.display = 'none';
        header_ul_list_to_remove[11].style.display = 'none';
        header_ul_list_to_remove[12].style.display = 'none';
    }
    else if(window.innerWidth > 1271){
        header_ul_list_to_remove[10].style.display = 'block';
        header_ul_list_to_remove[11].style.display = 'block';
        header_ul_list_to_remove[12].style.display = 'block';
    }
})
if(window.innerWidth < 1369){
    header_ul_list_to_remove[10].style.display = 'none';
    header_ul_list_to_remove[11].style.display = 'none';
    header_ul_list_to_remove[12].style.display = 'none';
}
////////////////////////////////////////////////////////////////////////////////////////////////////////// 


// modal windows open
let main_parent_block = document.querySelector('.nav_bar_ul_list');

const parent_show_modal_blocks = Array.from(main_parent_block?.getElementsByClassName('header_li_set_nav_bar') as HTMLCollectionOf<HTMLElement>);
const modal_blocks = Array.from(main_parent_block?.getElementsByClassName('modal_menu_window') as HTMLCollectionOf<HTMLElement>);


for(let i = 0; i < parent_show_modal_blocks.length; i++){
    parent_show_modal_blocks[i].addEventListener('mouseover', ()=>{
        modal_blocks[i].style.display = 'block';

        let get_link = parent_show_modal_blocks[i].childNodes[1] as HTMLElement;
        get_link.style.color = '#0a84ff';
    });

    parent_show_modal_blocks[i].addEventListener('mouseout', ()=>{
        modal_blocks[i].style.display = 'none';

        let get_link = parent_show_modal_blocks[i].childNodes[1] as HTMLElement;
        get_link.style.color = '#a6a5a5';
    });
}


// mobile modal basket open
let carShop_block = document.querySelector('.mobile_features_icons_shopcar') as HTMLDivElement;
let compation_carShop_mobile_block = carShop_block.querySelector('.compation_block_mobile') as HTMLDivElement;




// busket creating
function CreateBusketChoosenPhoneInf(phone_picture:string, phone_memory:string, phone_color:string, phone_price:string, phone_model:string, parent_block:HTMLElement):void{
    let inner_storage_inf_wrapper = document.createElement('div');
    inner_storage_inf_wrapper.setAttribute('class', 'inner_storage_inf');

    parent_block.appendChild(inner_storage_inf_wrapper);


    let phone_picture_modal_win_wrapper = document.createElement('div');
    phone_picture_modal_win_wrapper.setAttribute('class', 'inner_storage_inf_img_block');
    inner_storage_inf_wrapper.appendChild(phone_picture_modal_win_wrapper);


    let phone_img = document.createElement('img');
    phone_img.src = phone_picture;
    phone_picture_modal_win_wrapper.appendChild(phone_img);



    let phone_inf_modal_win_wrapper = document.createElement('div');
    phone_inf_modal_win_wrapper.setAttribute('class', 'inner_storage_inf_iphone_information');
    inner_storage_inf_wrapper.appendChild(phone_inf_modal_win_wrapper);


    let p_phone_title_name = document.createElement('p');
    p_phone_title_name.setAttribute('class', 'inner_storage_inf_phone_title');
    p_phone_title_name.innerText = `${phone_model}, ${phone_memory}, ${phone_color}`; 


    phone_inf_modal_win_wrapper.appendChild(p_phone_title_name);


    let p_phone_ammount = document.createElement('p');
    p_phone_ammount.setAttribute('class', 'inner_storage_inf_amout');
    p_phone_ammount.innerText = `Количество: ${1}`;
    phone_inf_modal_win_wrapper.appendChild(p_phone_ammount);


    let price_div_block = document.createElement('div');
    price_div_block.setAttribute('class', 'inner_storage_inf_price');
    price_div_block.innerText = phone_price;
    phone_inf_modal_win_wrapper.appendChild(price_div_block);




    let remove_from_shopList = document.createElement('button');
    remove_from_shopList.setAttribute('class', 'cancel_buying_block');
    remove_from_shopList.innerHTML = `<svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`
    inner_storage_inf_wrapper.appendChild(remove_from_shopList);
}
////////////////////////////////////////////////////////////////////////////////////////////////// 


// удаление элементов массива товаров корзины, либо товаров из блока сранения товаров
// тут тоже :)
function RemovingElFromBasketOrComprBasket<T extends BasketOrComparisonLocalStorage, U extends BasketOrComparison>(parentWithCancelBtns:HTMLElement, visual_counter:HTMLElement, LocalStorageBasketsUsed:T, BasketsUsed:U, typeOfFooterBlock:HTMLElement, parent_block:HTMLElement){

    // при наведении на иконку корзины, кроме выподающего модального окна, инициализируются "крестики" удаления элемента из корзины
    let [cancel_btns, inf_to_del] = [
        Array.from(parentWithCancelBtns.getElementsByClassName('cancel_buying_block') as HTMLCollectionOf<HTMLElement>),
        // получаем блок корзины с информацией, где нужно удалить информацию
        parentWithCancelBtns.querySelector('.compation_text') as HTMLElement
    ];

    console.log(cancel_btns);


    for (let j = 0; j < cancel_btns.length; j++) {
        cancel_btns[j].addEventListener('click', ()=>{

            // после клика на "крестик" получаем информацию из localStorage
            let getBasketPhonesInf = localStorage.getItem(LocalStorageBasketsUsed);

            inf_to_del.innerText = '';

            let parsedBasketPhonesInf = JSON.parse(getBasketPhonesInf!);


            if(BasketsUsed === 'basket'){
                 // получаем цену телефона, на который нажал пользователь (обращаемся к массиву объектов по индексу и по ключу "price" берем число, попутно сжимая его с помощью RegExp)
                let getPrice:number = parseInt(parsedBasketPhonesInf[j]['price']!.replace(/\s+/g, ""));
                ChangingTotalPriceForBasket(getPrice);
            }
               

            // далее десериализуем json строку и удаляем элемент по индексу
            if(cancel_btns.indexOf(cancel_btns[j]) > -1)
                parsedBasketPhonesInf.splice(cancel_btns.indexOf(cancel_btns[j]), 1);  
                

            // если длина массива не 0, то пересоздаем элементы без уже одного элемента
            if(parsedBasketPhonesInf.length !== 0){

                localStorage.setItem(LocalStorageBasketsUsed, JSON.stringify(parsedBasketPhonesInf));

                for (let k = 0; k < parsedBasketPhonesInf.length; k++){
                    let obj = parsedBasketPhonesInf[k];
                    CreateBusketChoosenPhoneInf(obj['picture'], obj['memory'], obj['color'], obj['price'], obj['model'], parent_block);
                }
                visual_counter.innerText = parsedBasketPhonesInf.length;

                // вызываем эту функцию ещё раз рекурсовно, потому что, видимо, в корзине есть ещё элементы, которые, возможно, пользователь решит удалить
                RemovingElFromBasketOrComprBasket(parentWithCancelBtns, visual_counter, LocalStorageBasketsUsed, BasketsUsed, typeOfFooterBlock, parent_block);
            }
            // если же 0, то удаляем ключ, скрываем счетчик, total price корзины и добавляем надпись о пустой корзине
            else{

                localStorage.removeItem(LocalStorageBasketsUsed);

                visual_counter.classList.add('hide');

                if(BasketsUsed === 'basket')
                    IfEmptyBasketOrCompLocStor(inf_to_del, 'Ваша корзина пуста', typeOfFooterBlock);
                else
                    IfEmptyBasketOrCompLocStor(inf_to_del, 'В сравнении пока ничего нет', typeOfFooterBlock);
            } 

        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// visual appearance of basket blocks
function AddVisualBasketsShow(show_products_modal_blocks:HTMLElement, classNameToShow:string){
    show_products_modal_blocks.classList.add(classNameToShow);
}

function RemoveVisualBasketsShow(index:number){
    if(show_products_modal_blocks[index].classList.contains('comp_block_show'))
        show_products_modal_blocks[index].classList.remove('comp_block_show');
    else
        show_products_modal_blocks[index].classList.remove('comp_block_show_2');
}
////////////////////////////////////////////////////////////////////////////////////////


// создание элементов корзины из localStorage 
function PushBasketOrCompInfInLocStor(localStorage_key:string, mobileOrPcVerBasketBlock:HTMLElement, basketCounter:HTMLElement, footer_visual_block:HTMLElement, parent_block:HTMLElement):void{
    let getBasketPhonesInf = localStorage.getItem(localStorage_key);


    let inf_to_del = mobileOrPcVerBasketBlock.querySelector('.compation_text') as HTMLElement;

    inf_to_del.innerText = '';

    let parsedBasketPhonesInf = JSON.parse(getBasketPhonesInf!);


    if(basketCounter.classList.contains('hide'))
        basketCounter.classList.remove('hide')

    basketCounter.innerText = parsedBasketPhonesInf.length;

    for (let k = 0; k < parsedBasketPhonesInf.length; k++){
        let obj = parsedBasketPhonesInf[k];
        CreateBusketChoosenPhoneInf(obj['picture'], obj['memory'], obj['color'], obj['price'], obj['model'], parent_block);
    }


    if(footer_visual_block.classList.contains('hide'))
        footer_visual_block.classList.remove('hide');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


// если в localStorage пуст, то виртуально создаем надпись об пустоте того или иного модального окна
// (решил побаловаться гежериками :) )
function IfEmptyBasketOrCompLocStor<T extends HTMLElement>(visual_counter_elem:T, warning_text:string, footer_visual_block:T, visualCounterToHide?:T){

    let p_text = document.createElement('div');
    p_text.setAttribute('class', 'empty_block');
    p_text.innerText = warning_text;
    visual_counter_elem.appendChild(p_text);

    if(!footer_visual_block.classList.contains('hide'))
        footer_visual_block.classList.add('hide');


    if(visualCounterToHide){
        if(!visualCounterToHide.classList.contains('hide'))
            visualCounterToHide.classList.add('hide');
    }

        
}
////////////////////////////////////////////////////////////////////////////// 


// изменение значений полной целы (total price) для корзины товаров
function ChangingTotalPriceForBasket(getPrice:number){
    // очищаем данные старой цены, чтобы записать новые
    block_to_push_price_main_pages.innerText = '';

    // записываем
    block_to_push_price_main_pages.innerText = `${parseInt(localStorage.getItem('total_price')!) - getPrice} BYN`;

    // переписываем в localStorage total price
    localStorage.setItem('total_price', `${parseInt(localStorage.getItem('total_price')!) - getPrice}`)
}
////////////////////////////////////////////////////////////////////////////// 


// добавление разделительной черты между сервисными товарами 
let feature_block = Array.from(document.getElementsByClassName('col-12 col-md-6 col-xl-4') as  HTMLCollectionOf<HTMLDivElement>);
window.addEventListener('resize',()=>{
    if(window.innerWidth <= 768){
        for (let i = 0; i < feature_block.length; i++)
            feature_block[i].classList.add('splitter_class');
    }
    else{
        for (let i = 0; i < feature_block.length; i++)
            feature_block[i].classList.remove('splitter_class');
    }
});
if(window.innerWidth <= 768){
    for (let i = 0; i < feature_block.length; i++)
        feature_block[i].classList.add('splitter_class');
}
//////////////////////////////////////////////////////////////////////////////










type BasketOrComparison = 'basket' | 'comparison';
type BasketOrComparisonLocalStorage = 'basket_phones' | 'comparison_basket_phones';


// pc variables
let parent_comp_like_shopcar_block = document.querySelector('.header_buttons') as HTMLElement;
let comp_like_shopcar_logos_to_over = Array.from(parent_comp_like_shopcar_block?.getElementsByClassName('scales_icon_block') as HTMLCollectionOf<HTMLElement>);
let show_products_modal_blocks = Array.from(parent_comp_like_shopcar_block.getElementsByClassName('compation_block') as HTMLCollectionOf<HTMLElement>); 
let total_phone_price_block_adder = document.querySelector('.phone_total_price_block') as HTMLElement;  
let block_to_push_price_main_pages = document.querySelector('.total_price') as HTMLElement;
let total_phone_comp_block_adder = document.querySelector('.comp_block_inf') as HTMLElement;
let change_visual_counter =  Array.from(document.getElementsByClassName('number_of_choosen_goods') as HTMLCollectionOf<HTMLElement>);
let svg_pictures = Array.from(document.getElementsByClassName('ng-tns-c152-0') as HTMLCollectionOf<HTMLElement>);


// mobile variables
let total_phone_price_block_adder_mobile = compation_carShop_mobile_block.querySelector('.phone_total_price_block') as HTMLElement;
let price_block_mob_ver = compation_carShop_mobile_block.querySelector('.total_price') as HTMLElement;
let parent_comp_mobile_block = compation_carShop_mobile_block.querySelector('.compation_text') as HTMLElement;
let get_mobile_basket_counter = document.querySelector('.number_of_choosen_goods_id_mobile') as HTMLElement;
let mobile_shopCar_icon = document.querySelector('#mobileCarShopFill') as HTMLElement





function RemovingElFromBasketIndependently(show_products_modal_block:HTMLElement, textInfBlock:HTMLElement, svgChangeColor:HTMLElement, className:string, visualCounter:HTMLElement, footerTotalElement:HTMLElement){
    AddVisualBasketsShow(show_products_modal_block, className);

    // visual effects
    svgChangeColor.style.fill = '#0a84ff'; svgChangeColor.style.color = '#0a84ff';

    // *чтобы понять, что тут происходит, нужно посмотреть ts файл 3 страницы (для быстрого поиска нужной строчки кода напишите в поиске "buy_btns" и смотрите в слушатель ивентов, там написано про ключ "number_of_goods_in_basket")
    // идет проверка на наличие особого ключа, если этот ключ есть, значит, имеется товар в корзине
    if('number_of_goods_in_basket' in localStorage){

        // далее мы удаляем этот ключ (предыстория того, почему у меня в голове возникла такая реализация - напишу в файле проделанной работы)
        localStorage.removeItem('number_of_goods_in_basket');

        // запускаем функцию удаления элементов из корзины
        RemovingElFromBasketOrComprBasket(show_products_modal_block, visualCounter, 'basket_phones', 'basket', footerTotalElement, textInfBlock);
    }
}

function RemovingElFromCompIndependently(show_products_modal_block:HTMLElement, textInfBlock:HTMLElement, svgChangeColor:HTMLElement, className:string, visualCounter:HTMLElement){
    AddVisualBasketsShow(show_products_modal_block, className);
    // visual effects
    svgChangeColor.style.fill = '#0a84ff'; svgChangeColor.style.color = '#0a84ff';

    // логика работы описана выше
    if('number_of_goods_in_CompBasket' in localStorage){
        localStorage.removeItem('number_of_goods_in_CompBasket');

        RemovingElFromBasketOrComprBasket(show_products_modal_block, visualCounter, 'comparison_basket_phones', 'comparison', total_phone_comp_block_adder, textInfBlock);
    }
}





// удаление элементов корзины/блока сравнения с расширенным navigation bar (не мобильное разрешение)
for (let i = 0; i < comp_like_shopcar_logos_to_over.length; i++){
    comp_like_shopcar_logos_to_over[i].addEventListener('mouseenter', ()=>{
        let parent_comp_phone_inf = show_products_modal_blocks[i].querySelector('.compation_text') as HTMLElement;

        if(i === 1){
            console.log(show_products_modal_blocks[1]);
            RemovingElFromBasketIndependently(show_products_modal_blocks[1], parent_comp_phone_inf, svg_pictures[7], 'comp_block_show', change_visual_counter[i], total_phone_price_block_adder);
        }
        else
            RemovingElFromCompIndependently(show_products_modal_blocks[0], parent_comp_phone_inf, svg_pictures[0], 'comp_block_show_2', change_visual_counter[i]);

    });
    comp_like_shopcar_logos_to_over[i].addEventListener('mouseleave', ()=>{
        svg_pictures[7].style.fill = svg_pictures[0].style.fill = '#fff';
        svg_pictures[7].style.color = svg_pictures[0].style.color = '#fff';

        RemoveVisualBasketsShow(i);   
    });
}



carShop_block.addEventListener('mouseenter', ()=>{
    let parent_comp_phone_inf = compation_carShop_mobile_block.querySelector('.compation_text') as HTMLElement;

    RemovingElFromBasketIndependently(compation_carShop_mobile_block, parent_comp_phone_inf, mobile_shopCar_icon, 'compation_block_mobile_show', get_mobile_basket_counter, total_phone_price_block_adder_mobile);
});


carShop_block.addEventListener('mouseleave', ()=>{
    compation_carShop_mobile_block.classList.remove('compation_block_mobile_show');

    mobile_shopCar_icon.style.fill = mobile_shopCar_icon.style.fill = '#fff';
});






////////////////////////checking localStorage inner inf/////////////////////////////////////// 
// если имеется ключ данных о корзине в localStorage, то создаем данные корзины

// функция для заполнения полей корзины для определенного устройства, если мобильное устройства (это проверяется чуть ниже), тогда прилетат свои параметры
// ежели пк, то свои, соответственно
function PushBasketDataMobOrPc(compation_device_block:HTMLElement, price_block_adder: HTMLElement, total_price_block: HTMLElement, basketCounter:HTMLElement){
    if('basket_phones' in localStorage){
        // этот checker сделан для того, чтобы была возможность зайди в цикл удаления элементов
        let just_checker = 1;
        localStorage.setItem('number_of_goods_in_basket', `${just_checker}`);

        let parent_comp_phone_inf = compation_device_block.querySelector('.compation_text') as HTMLElement;

        parent_comp_phone_inf.innerText = '';


        PushBasketOrCompInfInLocStor('basket_phones', show_products_modal_blocks[1], basketCounter, price_block_adder, parent_comp_phone_inf);

        total_price_block.innerText = `${localStorage.getItem('total_price')} BYN`;
    }
    else{
        let inf_to_del = compation_device_block.querySelector('.compation_text') as HTMLElement;  

        inf_to_del.innerText = '';

        IfEmptyBasketOrCompLocStor(inf_to_del, 'Ваша корзина пуста', price_block_adder, basketCounter);
    }
}

window.addEventListener('resize', ()=>{
    if(window.innerWidth < 998)
        PushBasketDataMobOrPc(compation_carShop_mobile_block, total_phone_price_block_adder_mobile, price_block_mob_ver, get_mobile_basket_counter);
    else
        PushBasketDataMobOrPc(show_products_modal_blocks[1], total_phone_price_block_adder, block_to_push_price_main_pages, change_visual_counter[1]);
});
if(window.innerWidth < 998)
    PushBasketDataMobOrPc(compation_carShop_mobile_block, total_phone_price_block_adder_mobile, price_block_mob_ver, get_mobile_basket_counter);
else
    PushBasketDataMobOrPc(show_products_modal_blocks[1], total_phone_price_block_adder, block_to_push_price_main_pages, change_visual_counter[1]);









// если имеется ключ данных о корзине сравнения в localStorage, то создаем данные корзины
if('comparison_basket_phones' in localStorage){
    // аналогично, как выше, только со своим ключом
    let just_checker = 1;
    localStorage.setItem('number_of_goods_in_CompBasket', `${just_checker}`);

    let parent_comp_phone_inf = show_products_modal_blocks[0].querySelector('.compation_text') as HTMLElement;

    PushBasketOrCompInfInLocStor('comparison_basket_phones', show_products_modal_blocks[0], change_visual_counter[0], total_phone_comp_block_adder, parent_comp_phone_inf);

    // чуть меняю расположение иконки
    change_visual_counter[0].style.right = '53px';
}
else{
    let inf_to_del = show_products_modal_blocks[0].querySelector('.compation_text') as HTMLElement;  

    IfEmptyBasketOrCompLocStor(inf_to_del, 'В сравнении пока ничего нет', total_phone_comp_block_adder);
}
////////////////////////////////////////////////////////////////////////////////////////////////












// open hamburger modal nav window
// логика открытия окна гамбурбера
let hamburder_to_open = document.querySelector('.mobile_hamburger_wrapper') as HTMLSpanElement;
let hamburger = document.querySelector('.hamburger') as HTMLElement;
let modal_window_block = document.querySelector('.modal_nav_block_wrapper') as HTMLElement;
let hamburder_span = document.querySelector('.hamburger') as HTMLSpanElement;
let body_block = document.querySelector('body') as HTMLBodyElement;

let open_or_not:boolean = false;

function RemoveOrAdd<T extends DOMTokenList>(bodyLock:T, hamburder_manipulation:T, hamburder_span:T, modal_window_position:T, openingChecker:boolean):boolean{
    open_or_not = openingChecker;
    switch(openingChecker){
        case true:
            bodyLock.add('body_to_stuck');
            hamburder_manipulation.add('active_hamburder');
            hamburder_span.add('hide_middle_line_gamburger');
            modal_window_position.remove('hide');
            break;
        case false:
            bodyLock.remove('body_to_stuck');
            hamburder_manipulation.remove('active_hamburder');
            hamburder_span.remove('hide_middle_line_gamburger');
            modal_window_position.add('hide');
            break;
    }
    return open_or_not;
}


hamburder_to_open.addEventListener('click', ()=>{
    if(!open_or_not)
        open_or_not = RemoveOrAdd(body_block.classList, hamburger.classList, hamburder_span.classList, modal_window_block.classList, true);
    else{
        open_or_not = RemoveOrAdd(body_block.classList, hamburger.classList, hamburder_span.classList, modal_window_block.classList, false);
    }
});


// подсчеты высоты модального окна гамбургера
window.addEventListener('resize', ()=>{
    console.log(open_or_not);
    modal_window_block.style.maxHeight = `${window.innerHeight - 65}px`;
    // если человек с планшета зашел на мой сайт, к примеру, открыл модальное окно и случайно, или специально, перевернул устройство, тогда сами кликаем на гамбургер, таким образом закрываем его
    if(window.innerWidth > 1000 && open_or_not)
        hamburder_to_open.click();
});

if(window.innerWidth <= 768){
    modal_window_block.style.maxHeight = `${window.innerHeight - 65}px`;
}
//////////////////////////////////////////////////////////////////////////////////////////////////// 



// open/close more inf about shop
let open_more_inf_btn = document.querySelector('.btn_to_visual') as HTMLElement;
 
open_more_inf_btn?.addEventListener('click', ()=>{
    let remove_hide_set = document.querySelector('.hiden_inf_block') as HTMLElement;

    if(remove_hide_set.classList.contains('hide')){
        remove_hide_set?.classList.remove('hide');
        let span_text_change = open_more_inf_btn.querySelector('span') as HTMLElement;
        span_text_change.innerText = 'Свернуть';
    }
    else{
        remove_hide_set?.classList.add('hide');
        let span_text_change = open_more_inf_btn.querySelector('span') as HTMLElement;
        span_text_change.innerText = 'Показать полностью';
    }
});
////////////////////////////////////////////////////////////////////////////

















// envelope click btn
let parent_envelope_block = document.querySelector('.btn_area') as HTMLElement;

document.querySelector('.btn_area')?.addEventListener('click', ()=>{
    let active_block =  document.querySelector('.inner_btn_inf_wrapper') as HTMLElement;

    active_block.style.display === 'block' ? active_block.style.display = 'none' : active_block.style.display = 'block'  
})
////////////////////////////////////////////////////////////////////////////
