import rhinoscriptsyntax as rs

if active: 
    savedLocation = filePath + str(int(frame)).zfill(4) +".png"
    rs.Command("-ViewCaptureToFile \n\"" + savedLocation + "\"\n")