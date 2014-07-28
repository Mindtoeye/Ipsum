@echo off
if '%1'=='w' (
echo array_name[%i%]='path%2'; >> array_it.js
set /a i=i+1
) else (
echo array_name=[]; > array_it.js
set /a i=0
for %%p in (*.jpg, *.gif, *.png) do (
call list.bat w %%p
)
set i
set i=
)