function myFunction() {
  var thisSs = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1faTgMGVbsYa92rEUDxOI58yfU7OeYBc2N20pK0AoyHA/edit#gid=1366041791');
  var thisSheet = thisSs.getSheetByName('Impresión de Cartas');
  var lastrow = thisSheet.getDataRange().getNumRows();
  var column = thisSheet.getDataRange();
  var deudores = column.getValues();
  var bdSS = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/16PoeOrXVkD46N3tOzxNbtBHSOdHuw6cB9oW12AO8gHY/edit#gid=181205988');
  
  for(var i = 1; i < lastrow; i++){
    var bdsheet = bdSS.getSheetByName(deudores[i][2]);
    var lastrowbd = bdsheet.getDataRange().getNumRows();
    
    var htmlBody_debe = HtmlService.createTemplateFromFile('email_cuerpo');
    htmlBody_debe.nombre = deudores[i][1];
    htmlBody_debe.adeudo = deudores[i][3];
    var email_cuerpo = htmlBody_debe.evaluate().getContent(); 
    for(var j = 1; j < lastrowbd; j++){
      if(deudores[i][1] == bdsheet.getRange('B' + j).getValue()){
        var correo = bdsheet.getRange('E' + j).getValue();
        j = lastrowbd + 1;
      }
    }
    MailApp.sendEmail({
      to: correo,
      subject: 'Aviso adeudo',
      htmlBody: email_cuerpo,
      name: 'Instituto Francisco Possenti'
    });
  }
}
