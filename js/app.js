swalWinSwitch=!1,swalLooseSwitch=!1,lives=5;let Enemy=function(x,y,s){this.x=x;this.y=y+55;this.speed=s;this.max=505;this.resetPos=-505;this.sprite='images/enemy-bug.png'};Enemy.prototype.update=function(dt){if(this.x<this.max){this.x+=this.speed*dt}
else{this.x=this.resetPos}};Enemy.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};class PlayerChar{constructor(){this.setX=101*2;this.setY=(83*3)+55;this.x=this.setX;this.y=this.setY;this.sprite='images/char-boy.png'}};PlayerChar.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};PlayerChar.prototype.reset=function(){this.y=this.setY;this.x=this.setX};PlayerChar.prototype.handleInput=function(key){switch(key){case 'up':if(this.y>0){this.y-=83;this.update()}
break;case 'down':if(this.y<83*4){this.y+=83;this.update()}
break;case 'left':if(this.x>0){this.x-=101;this.update()}
break;case 'right':if(this.x<101*4){this.x+=101;this.update()}
break}};PlayerChar.prototype.update=function(){for(let enemy of allEnemies){if(this.y===enemy.y&&(enemy.x+80>this.x&&enemy.x<this.x+80)){if(lives>0){lives--;removeLive();this.reset()}else if(lives==0){if(swalLooseSwitch==!1){swalLooseSwitch=!0;Swal.fire({type:'Error',title:'Oppps! You loose!',text:`With ${lives} Lives. That roach was hittin you to hard...`,allowOutsideClick:!1,backdrop:`
                    rgba(255,255,255, 1)
                    center left
                    no-repeat
                `,confirmButtonText:'<i class="fa fa-thumbs-up"></i> Play Again'}).then(function(){restartGame()})}}}};if(this.y==-28&&swalWinSwitch==!1){swalWinSwitch=!0;Swal.fire({type:'success',title:'Congratulations! You Won!',text:`With ${lives} Lives`,allowOutsideClick:!1,backdrop:`
        rgba(255,255,255, 1)
        center left
        no-repeat
      `,confirmButtonText:'<i class="fa fa-thumbs-up"></i> Play Again'}).then(function(){restartGame()})}};function removeLive(){let lives=document.getElementsByClassName("lives");for(i=0;i<lives[0].children.length;i++){if(lives[0].children[i].innerHTML==='<i class="fa fa-heart"></i>'){lives[0].children[i].innerHTML='<i class="fa fa-heart-o"></i>';return}}};function restartGame(){window.location.reload(!1)};let allEnemies=[new Enemy(-103,0,100),new Enemy(-103,83,200),new Enemy(-303*4,0,300)],player=new PlayerChar();document.addEventListener('keyup',function(e){var allowedKeys={37:'left',38:'up',39:'right',40:'down'};player.handleInput(allowedKeys[e.keyCode])})