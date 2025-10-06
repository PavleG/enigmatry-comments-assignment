#!/bin/bash
(cd ./Enigmatry.Comments.Api && dotnet run) &
(cd ./enigmatry-comments-app && npm start) & 
wait