Function makeInputBox(tit,pr,def)
   makeInputBox = InputBox(pr,tit,def)
End Function
  
Function OpenDoc(strLocation)   
   Set objWord = CreateObject("Word.Application")   
   objWord.Visible = true   
   objWord.Documents.Open strLocation   
End Function  


Function OpenExcel(strLocation)    
   dim ExcelApp, ExcelWB
   set ExcelApp = createobject("Excel.Application")
   ExcelApp.visible = true
   set ExcelWB = ExcelApp.Workbooks.Open(strLocation) 
End Function  


Function OpenPowerpoint(strLocation) 
   set pwrptApp = createobject("Powerpoint.Application")
   pwrptApp.visible = true
   pwrptApp.Presentations.Open(strLocation)
End Function 
