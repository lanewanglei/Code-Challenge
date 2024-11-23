import { test, expect} from '@playwright/test';

interface Ifestival {
    name?: string
    bands: Iband[]
  }
  
  interface Iband {
    name: string
    recordLabel?: string
  }

test ( 'Get festivals', async ({request}) => {

    const response = await request.get('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals');

    expect (response.status()).toBe(200);
    console.log('status:' + response.status());
    let text : String = await response.text();

    expect(text).toContain('LOL-palooza');

    let json: JSON = await response.json();
    console.log("json:" + json);


    await response.json().then((festivals: Ifestival[]) => {
        console.log("festivals:" + festivals);
        var names = ["Trainerella", "Twisted Tour", "LOL-palooza", "Small Night In"]; 

        expect(names.indexOf("LOL-palooza")).toBeGreaterThanOrEqual(0);
        expect (festivals.length).toBe(5);

        festivals.forEach(function (festival:Ifestival) {
            console.log("festival.name=" + festival.name);
            if(festival.name==="Trainerella"){
                expect (festival.bands.length).toBe(4);
            }
            if(festival.name==="Twisted Tour"){
                expect (festival.bands.length).toBe(3);
            }
            if(festival.name==="Small Night In"){
               
                expect (festival.bands.length).toBe(5);
                festival.bands.forEach(function (band:Iband) {
                    console.log("band:  name=" + band.name + " , recordLabel=" + band.recordLabel);
                
                });
            }
          }); 
      
        });
    

})