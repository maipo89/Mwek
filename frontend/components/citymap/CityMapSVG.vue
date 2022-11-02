<template>
    <div class="city-map-svg" ref="cityMap">
        <!-- 
        <CityParks />

        <CityLights /> -->

        <!-- <CityRoadOne /> -->

        <!-- <CityBuilding /> -->
    </div>
</template>

<script>
    // import * as PIXI  from 'pixi.js'
    export default {
        name: 'CityMapSVG',
        async mounted(){
            const PIXI = await import('pixi.js');
            const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
            this.$refs.cityMap.appendChild(app.view);
            
            var mapCont = new PIXI.Container();
            var map = new PIXI.Sprite.from('/images/LightCity.jpg');

            mapCont.addChild(map);
            app.stage.addChild(mapCont);

            mapCont.interactive = true;
            mapCont.buttonMode = true;

            map.anchor.set(0.5);

            // move the sprite to the center of the screen
            mapCont.x = app.screen.width / 2;
            mapCont.y = app.screen.height / 2;

            var xStore = []
            var xCount = 0; 

            var xCanMoveRight = true;
            var xCanMoveLeft = true;
            var yCanMoveTop = true;
            var yCanMoveDown = true;

            // this.app.stage.addChild(mapCont);

    //         map.interactive = true;

    // // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    //         map.buttonMode = true;

            app.animationUpdateXright = function(delta) {
                // console.log('mapCont.x', mapCont.x )
                var checkCords = mapCont.getBounds();
                if(checkCords.x > 0){
                     mapCont.x = mapCont.x - 15;
                }
               
                // console.log(mapCont.x);
            }


            app.animationUpdateXleft = function(delta) {
                // console.log('mapCont.x', mapCont.x )
                var checkCords = mapCont.getBounds();
                var rightCheck = 0 - ( mapCont._boundsRect.width / 2);
                if(checkCords.x < rightCheck){
                    mapCont.x = mapCont.x + 15;
                }
                // for(i = 0; i < )
            }


            app.animationUpdateYtop = function(delta) {
                // console.log('mapCont.x', mapCont.x )
                var checkCords = mapCont.getBounds();
                if(checkCords.y > 0){
                    mapCont.y = mapCont.y - 15;
                }
                
            }

            
            app.animationUpdateYbottom = function(delta) {
                // console.log('mapCont.x', mapCont.x )
                // mapCont.y += 0.1 * 10;
                var checkCords = mapCont.getBounds();
                var bottomCheck = 0 - ( mapCont._boundsRect.height / 2);
                if(checkCords.y < bottomCheck){
                    mapCont.y = mapCont.y + 15;
                }
            }

            console.log('app',app.renderer.width);
            // var checkCordsStart = mapCont.getBounds();
            // console.log('checkCords.x ', checkCordsStart.x );

            mapCont.on('pointerdown', onDragStart)
                .on('pointerup', onDragEnd)
                .on('pointerupoutside', onDragEnd)
                .on('pointermove', onDragMove);

            function onDragStart(event) {
                // store a reference to the data
                // the reason for this is because of multitouch
                // we want to track the movement of this particular touch
                this.data = event.data;
                

                //store this variable for convenience           
                let position = this.data.getLocalPosition(this);
                // Set the pivot point to the new position
                this.pivot.set(position.x, position.y)
                // update the new position of the sprite to the position obtained through 
                // the global data. This ensures the position lines up with the location of 
                // the mouse on the screen. I'm not certain why, but this is necessary. 
                this.position.set(this.data.global.x, this.data.global.y)
                this.dragging = true;


            }

            function onDragEnd() {
                this.alpha = 1;
                this.dragging = false;
                // set the interaction data to null
                this.data = null;

                var checkCords = mapCont.getBounds();

                console.log('checkCords.x ', checkCords );
                
                console.log('mapCont', mapCont._boundsRect.height / 2);

                if(checkCords.x > 0){
                    app.ticker.add(app.animationUpdateXright);
                }
                


                var rightCheck = 0 - ( mapCont._boundsRect.width / 2);
                console.log(rightCheck);
                if(checkCords.x < rightCheck){
                    app.ticker.add(app.animationUpdateXleft);

                    
                    // app.ticker.remove(app.animationUpdateXleft);
                }

                if(checkCords.y > 0){
                    app.ticker.add(app.animationUpdateYtop);
                }

                var bottomCheck = 0 - ( mapCont._boundsRect.height / 2);
                if(checkCords.y < bottomCheck){
                    app.ticker.add(app.animationUpdateYbottom);
                    
                    // app.ticker.remove(app.animationUpdateXleft);
                }
            }

            function onDragMove() {


                // var checkCords = mapCont.getBounds();
   



                // check if you are hitting the container edge of the browser

                // if(checkCords.x > 0){
                //     xCanMoveRight = false;
                // }

                // if(checkCords.x <= 0 - mapCont._boundsRect.width / 2){
                //     // xCanMoveLeft = false;
                //     // app.ticker.add(app.animationUpdateXleft);
                   
                //     // app.ticker.remove(app.animationUpdateXleft);
                //         // mapCont.interactive = true;
                //         // mapCont.buttonMode = true;
                //         // console.log('mapCont.x', mapCont.x);   
                 
                // }





                if (this.dragging) {
                    var newPosition = this.data.getLocalPosition(this.parent);

                    // if(xCanMoveRight){
                    //     this.x = newPosition.x;
                    //     this.dragging = true
                    //     // console.log('newPosition.x',newPosition.x);
                    //     // console.log(map.x);
                    //     mapCont.interactive = true;
                    //     mapCont.buttonMode = true;

                    // }else{
                        
                    //     app.ticker.add(app.animationUpdateXright);
                    //     setTimeout (function(){
                    //         app.ticker.remove(app.animationUpdateXright);
                    //         xCanMoveRight = true;
                    //         // mapCont.interactive = true;
                    //         // mapCont.buttonMode = true;
                    //         // console.log('mapCont.x', mapCont.x);   
                    //     }, 400);
                    // }
                    this.x = newPosition.x;
                    // if(xCanMoveLeft){
                    //     this.x = newPosition.x;
                    //     this.dragging = true
                    //     // console.log('newPosition.x',newPosition.x);
                    //     // console.log(map.x);
                    //     mapCont.interactive = true;
                    //     mapCont.buttonMode = true;

                    // }else{
                        
                    //     app.ticker.add(app.animationUpdateXleft);
                    //     setTimeout (function(){
                    //         app.ticker.remove(app.animationUpdateXleft);
                    //         xCanMoveLeft = true;
                    //         // mapCont.interactive = true;
                    //         // mapCont.buttonMode = true;
                    //         // console.log('mapCont.x', mapCont.x);   
                    //     }, 400);
                    // }
                    
                    this.y = newPosition.y;
                }
            }

           // let app = new PIXI.Application({ width: 640, height: 360 });
            // document.body.appendChild(app.view);

        }
    }
</script>