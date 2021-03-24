//GET specified fields from object
// data = object , Keys =[Requred fields]
class Methods {



    getdaata(data, Keys) {
        return Object.keys(data)
            .filter(i => Keys.includes(i))
            .reduce((acc, key) => {
                acc[key] = data[key];
                return acc;
            }, {});
    }
/// Convert Excel JSON data to proper JSON Object
    convertExcelJSONDataToObjects(data) {
        let obj = [];
        let dataObject = {};
        data.forEach((row, i) => {
            if (i == 0) { obj = row; } else {
                dataObject = {};
                obj.forEach((key, keyIndex) => {
                    row.map((field, fieldIndex) => {
                        if (keyIndex == fieldIndex) {
                            dataObject[key] = field;
                        }
                    });
                });
                data.push(dataObject);
            }
        });
    }

    // Get EXCEL file by url and convert to json
const blob = await fetch('https://apiuat.pdfdoc.io/2020-7/22/5f18225730980d587e60ff8b.jpg').then(r => r.blob());
console.log(blob);


    async getFileByUrl(href) {
        const blob = await fetch(href).then(r => r.blob());
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(blob);
        reader.onload = (e: any) => {
          /* read workbook */
          const bstr: string = e.target.result;
          const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
          /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
          // console.log('ws', ws)
          /* save data */
          this.fileData = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        };
      }

      // Sort objects depending in field in object
      sortObject(fields) {
          //ascending
        fields.sort((a, b) => (a.sequenceNumber > b.sequenceNumber) ? 1 : -1);
      }


// custom title case function get firdt letter capital
  titleCase(name) {
    if (name.split(' ')) {
      let updatedName = '';
      name.split(' ').map(name => {
        updatedName += name.charAt(0).toUpperCase() + name.slice(1, name.length) + " ";
      })
      return updatedName;
    } else {
      return name.charAt(0).toUpperCase() + name.slice(1, name.length);
    }
  }

// auto incerase height of text area
  @ViewChild('taskTitle') taskTitle: ElementRef;
	valye changes
autoGrow(element) {
    element.style.height = "5px";
}



public void onLocationChanged(Location location) {

 double lat2 = location.getLatitude();
 double lng2 = location.getLongitude();

    // lat1 and lng1 are the values of a previously stored location
    if (distance(lat1, lng1, lat2, lng2) < 0.1) { // if distance < 0.1 miles we take locations as equal
       //do what you want to do...
    }
}

/** calculates the distance between two locations in MILES */
private double distance(double lat1, double lng1, double lat2, double lng2) {

    double earthRadius = 3958.75; // in miles, change to 6371 for kilometer output

    double dLat = Math.toRadians(lat2-lat1);
    double dLng = Math.toRadians(lng2-lng1);

    double sindLat = Math.sin(dLat / 2);
    double sindLng = Math.sin(dLng / 2);

    double a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
        * Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2));

    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    double dist = earthRadius * c;

    return dist; // output distance, in MILES
}
    element.style.height = (element.scrollHeight) + "px";
  }
}



/// acroll to topp
 scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  //////////////////


  toDataURL(url) {
    let type;
    if (url.indexOf('.jpg') > -1) {
      type = ('image/jpeg');
    } else if (url.indexOf('.png') > -1) {
      type = ('image/png');
    } else if (url.indexOf('.gif') > -1) {
      type = ('image/gif');
    } else {
      ('image/png');
    }
 
  }
