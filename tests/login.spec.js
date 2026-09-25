import{test,page,expect,browser} from'@playwright/test';


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
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill('Password@123');
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    const header=await page.locator('.card-body').allTextContents();
    console.log(header);
    for(let i=0;i<header.length;i++){
        let headerText=await page.locator('.card-body').nth(i).locator('b').textContent();
        if(headerText==='ZARA COAT 3'){
            await page.locator('.card-body').nth(i).getByText('ADD TO CART').click();
            break;
        }
}
    await page.locator('button[routerlink="/dashboard/cart"]').click();
    const cart=await page.locator('.cartWrap .items').allTextContents();
    for(let i=0;i<cart.length;i++){
        let cartText=await page.locator('.cartWrap .items').nth(i).locator('h3').textContent();
        console.log(cartText,i);
        if(cartText==='ZARA COAT 3'){
            await page.locator('.cartWrap .items').nth(i).locator('.btn-primary').click();
            await page.pause();
            break;
        }   
    }


  
    })
