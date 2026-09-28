import{test,page,expect,browser} from'@playwright/test';
import { text } from 'node:stream/consumers';


// test('login test',async({browser})=>{

//     const context = await browser.newContext();
//     const page = await context.newPage();

//     const email = 's1a112232@gmail.com';
//     const mobile = '1234577720';
//     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
//     //await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
//     // await page.locator("//section/a[contains(text(),'Register')]").click();
//     // await page.locator("#firstName").fill('John');
//     // await page.locator("#lastName").fill('Doe');
//     // await page.locator("#userEmail").fill(email);
//     // await page.locator("#userMobile").fill(mobile);
//     // await page.locator("#userPassword").fill('Password@123');
//     // await page.locator("#confirmPassword").fill('Password@123');
//     // await page.locator("//span[contains(text(),'Male')]").click();
//     // await page.locator("//select").selectOption('Engineer');
//     // await page.locator("//input[@type='checkbox']").check();
//     // await page.locator("#login").click();
//     // await page.waitForTimeout(2000);
//     // await expect(page.locator("//h1[contains(text(),'Account Created Successfully')]")).toContainText('Account Created Successfully');

//     // await page.locator("//button[contains(text(),'Login')]").click();
//    /* await page.locator("#userEmail").fill(email);
//     await page.locator("#userPassword").fill('Password@123');
//     await page.locator("#login").click();
//     const starttime=Date.now();
//     await page.waitForLoadState('networkidle');
//     const endtime=Date.now();
//     console.log('Page load time:', endtime - starttime, 'ms');
//     let header=await page.locator('//b').allTextContents();
//     console.log(header);

//     for(let head of header){
//         if(head==='ADIDAS ORIGINAL'){
//             console.log(head,': Header is present');
//         }
// }
// console.log(await page.title());
// await expect(page).toHaveTitle("Let Shop"); */

// // const page2Promise= context.waitForEvent('page');
// // await page.locator("//a[contains(@href,'documents-request')]").click();
// // const page2 = await page2Promise;
// // await expect(page2).toHaveTitle("Document Request");

// const [newpage] = await Promise.all([context.waitForEvent('page'),
// await page.locator("//a[contains(@href,'documents-request')]").click()
// ]);
// await expect(newpage).toHaveTitle("RS Academy");

// let emailid=await newpage.locator(".red a").nth(0).textContent();
// console.log(emailid);
// emailid=emailid.split('@')[1];
// emailid=emailid.split(' ')[0];
// console.log(emailid);
// await newpage.close();
// await page.locator("#username").fill(emailid)
// await page.locator("select.form-control").selectOption('teach');
// await page.locator("select.form-control").selectOption({ label: "Student" });
// await page.pause();
// // await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
// }
// )



test('login test2',async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = 's1a112232@gmail.com';
    const mobile = '1234577720';
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login',{timeout:60000});
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('Password@123');
    await page.getByRole('button',{name:'Login'}).click();
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body').last().waitFor();
    // const header=await page.locator('.card-body').allTextContents();
    // console.log(header);
    // for(let i=0;i<header.length;i++){

    //     let headerText=await page.locator('.card-body').nth(i).locator('b').textContent();
    //     if(headerText==='ZARA COAT 3'){
    //         await page.locator('.card-body').nth(i).getByText('ADD TO CART').click();
    //         break;
    //     }
// }
    await page.locator('.card-body').filter({hasText:'ZARA COAT 3'}).getByText('ADD TO CART').click();

 

    await page.locator('button[routerlink="/dashboard/cart"]').click();
    // const cart=await page.locator('.cartWrap .items').allTextContents();
    // for(let i=0;i<cart.length;i++){
    //     let cartText=await page.locator('.cartWrap .items').nth(i).locator('h3').textContent();
    //     console.log(cartText,i);
    //     if(cartText==='ZARA COAT 3'){
    //         await page.locator('.cartWrap .items').nth(i).locator('.btn-primary').click();
    //         break;
    //     }   
    // }

    await page.locator('.cartWrap .items').filter({hasText:'ZARA COAT 3'}).locator('.btn-primary').click();

     await expect(page.locator('.user__name label')).toHaveText('s1a112232@gmail.com');
     await page.locator('[placeholder="Select Country"]').type('ind');
     await(page.locator('.form-group section button')).last().waitFor();
     const Country= await(page.locator('.form-group section button')).allTextContents();
     console.log(Country);
     for(let i=0;i<Country.length;i++)
    {
        let contrytext=await(page.locator('.form-group section button')).nth(i).textContent();
        console.log('contry',contrytext); 
      
     if(contrytext===" India")
     {
        await(page.locator('.form-group section button')).nth(i).click()
        break;
     }
    }
    await page.locator('.action__submit').click();
    
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

    const orderCode=await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    await page.locator('[routerlink="/dashboard/myorders"]').first().click();    
    await page.locator('tbody th').last().waitFor();
    const orderIDS=await page.locator('tbody tr th').allTextContents();
    for(let i=0;i<orderIDS.length;i++)
    { 
        console.log(orderIDS[i]," : ",orderCode);
        
        if(orderCode.includes(orderIDS[i]))
        {
           await page.locator('tbody tr').nth(i).locator('button').first().click();
           break;
        }
      
    }
    await expect(page.locator('.email-wrapper .email-container .email-title')).toHaveText(' order summary ');

})



test.only("Assignment",async({page})=>
{
    const password='Password@123';
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill('s1a112232@gmail.com');
    await page.getByLabel('Password').fill(password);
    await page.locator('#login-btn').click();
    
    await expect(page.getByText('Browse Events →')).toBeVisible();

    await page.getByText('Admin').click();
    await page.getByText('Manage Events').first().click();
    const titleName=`title${Date.now()}`;
    await page.locator('#event-title-input').fill(titleName);
    await page.locator('#admin-event-form textarea').fill("My events");
    await page.getByLabel('City').fill('Bangalore');
    await page.getByLabel('Venue').fill('23rd Main, 3rd Sector CA-12, 22nd Cross Rd, near Narayana Hospital, HSR Layout, Bengaluru, Karnataka 560102');
    function futureDateValue(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toISOString().split('T')[0];
}
console.log(futureDateValue(10));
   const dateTime = page.locator('input[type="datetime-local"]');

await dateTime.fill('2026-10-02T15:00');

await expect(dateTime).toHaveValue('2026-10-02T15:00');
    await page.getByLabel(' Price ($)').fill('1000');
    await page.locator('#total-seats').fill('50');
    await page.locator('#add-event-btn').click();
   await expect(page.getByText('Event created!')).toBeVisible({
    timeout: 5 * 1000
});
    await page.locator('[href="/events"]').first().click();

    await page.locator('[data-testid="event-card"] .flex').first().waitFor();
    await expect(page.locator('[data-testid="event-card"] .flex').filter({hasText:titleName})).toBeVisible({timeout:5*1000});
    const text= await page.locator('[data-testid="event-card"] .flex').filter({hasText:titleName}).locator('.text-xs').textContent();
    console.log(text);
    const seatsBeforeBooking = text.split('seats')[0].trim();
await page.locator('[data-testid="event-card"] .flex').filter({hasText:titleName}).locator('[data-testid="book-now-btn"]').click();

await page.getByLabel('Full Name').fill('Santosh');
await page.locator('#customer-email').fill('s1a112232@gmail.com');
await page.getByPlaceholder('+91 98765 43210').fill('+91 98765 43210');
await page.locator('.confirm-booking-btn').click();
await expect(page.locator('.booking-ref')).toBeVisible();
const refNumber=await page.locator('.booking-ref').textContent();
await page.getByText('View My Bookings').click();
await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');

await page.locator('#booking-card').first().waitFor();
await expect(page.locator('#booking-card').filter({hasText:refNumber})).toBeVisible();
await expect(page.locator('#booking-card').filter({hasText:refNumber}).locator('h3').filter({hasText:titleName})).toBeVisible();

await page.locator('[href="/events"]').first().click();

await page.locator('[data-testid="event-card"] .flex').first().waitFor();
console.log(titleName);
await expect(page.locator('[data-testid="event-card"] .flex').filter({hasText:titleName})).toBeVisible({timeout:5*1000});
    const text2= await page.locator('[data-testid="event-card"] .flex').filter({hasText:titleName}).locator('.text-xs').textContent();
    console.log(text2);
    const seatsAfterBooking  = text2.split('seats')[0].trim();
  console.log(" seatsAfterBooking ",seatsAfterBooking);
  console.log('seatsBeforeBooking ',seatsBeforeBooking);

    if(seatsAfterBooking == seatsBeforeBooking-1)
    {
        console.log("conunt is reduce by 1 and seatsAfterBooking",seatsAfterBooking," seatsBeforeBooking:",seatsBeforeBooking)
    }
})