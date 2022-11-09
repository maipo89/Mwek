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
            const app = new PIXI.Application({transparent: true,  width: window.innerWidth, height: window.innerHeight });
            this.$refs.cityMap.appendChild(app.view);
            
            var mapCont = new PIXI.Container();
            var map = new PIXI.Sprite.from('/images/LightCity.png');

            mapCont.addChild(map);

            mapCont.interactive = true;
            mapCont.buttonMode = true;
            map.anchor.set(0.5,0.5);
            mapCont.x = app.screen.width / 2;
            mapCont.y = app.screen.height / 2;

            var xStore = []
            var xCount = 0; 


            function createGradTexture() {
                // adjust it if somehow you need better quality for very very big images
                const quality = 256;
                const canvas = document.createElement('canvas');
                canvas.width = quality;
                canvas.height = 1;

                const ctx = canvas.getContext('2d');

                // use canvas2d API to create gradient
                const grd = ctx.createLinearGradient(100, 100, quality, 100);
                grd.addColorStop(0, 'rgba(255, 255, 255, 0.0)');
                grd.addColorStop(0.3, '#F0F0F330');
                grd.addColorStop(0.7, '#00CCD669');
                grd.addColorStop(1, '#9E00FC');

                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, quality, 1);

                return PIXI.Texture.from(canvas);
            }

            const gradTexture = createGradTexture();

            const graphics = new PIXI.Graphics();
            // graphics.beginFill(0xDE3249);
            // // graphics.beginTextureFill(gradTexture);
            // graphics.drawRect(50, 50, 100, 100, 30);
            // graphics.endFill();


            // just a little scriipt to find X Y while positioning things
            // var pixiCanva = app;

            // // app.addEventListener("click", onClick);

            // function onClick () {
            //     var target = this;
            //     alert(target.x);
            //     alert(target.y);
            // }



            // graphics.lineStyle(2, 0xFF00FF, 1);
            // graphics.beginFill(0x650A5A, 0.2);
            // graphics.drawRoundedRect(-652, 57, 20, 20, 1);
            // graphics.endFill();

            graphics.alpha = 0.3
            graphics.lineStyle(1, 0xffd900, 1);

            // the three towers mask

            graphics.beginFill(0xFF3300);
            graphics.moveTo(-656, 59);
            graphics.lineTo(-656, 59);
            graphics.lineTo(-639, 68);
            graphics.lineTo(-622, 60);
            graphics.lineTo(-614, -49);
            graphics.lineTo(-669, -47);
            graphics.closePath();
            graphics.endFill();

            graphics.beginFill(0xFF3300);
            graphics.moveTo(-723, 84);
            graphics.lineTo(-723, 84);
            graphics.lineTo(-709, 93);
            // -708.7968139648438/91.99664306640625
            graphics.lineTo(-693, 85);
            // -673.2498779296875/-47.036376953125
            graphics.lineTo(-673, -47);
            // -739.8705444335938/-39.6455078125
            graphics.lineTo(-739, -39);
            graphics.closePath();
            graphics.endFill();

            // end of three tower masks

            // Mwek building mask

            graphics.beginFill(0xFF3300);
            graphics.moveTo(-149, -157);
            graphics.lineTo(-149, -157);
            // -149.56100463867188/-157.09686279296875
            graphics.lineTo(-89, -123);
            // -89.15414428710938/-123.04501342773438
            // // -708.7968139648438/91.99664306640625
            graphics.lineTo(-55, -144);
            // -55.0130615234375/-144.388671875
            // // -673.2498779296875/-47.036376953125
            graphics.lineTo(-43, -537);
            // // -739.8705444335938/-39.6455078125
            graphics.lineTo(-151, -543);
            // -151.88214111328125/-243.8634033203125
            // -43.7164306640625/-237.19659423828125
            graphics.closePath();
            graphics.endFill();


            // ############ mwek building light sprites  #############

            var HQcont = new PIXI.Container();
            var HQmiddle = new PIXI.Sprite.from('/images/light/HQ-middle.png');
            var HQouter = new PIXI.Sprite.from('/images/light/HQ-outer.png');
            // var HQcentre = new PIXI.Sprite.from('/images/light/HQ-centre.png');


            var HQDotscont = new PIXI.Container();

            var d1 = new PIXI.Sprite.from('/images/light/d1.png');
            var d2 = new PIXI.Sprite.from('/images/light/d2.png');
            var d3 = new PIXI.Sprite.from('/images/light/d3.png');
            var d4 = new PIXI.Sprite.from('/images/light/d4.png');
            var d5 = new PIXI.Sprite.from('/images/light/d5.png');

            d1.y = 0;
            d2.y = 10;
            d3.y = 20;
            d4.y = 30;
            d5.y = 40;

            HQDotscont.addChild(d1,d2,d3,d4,d5);


            var d1Count = 0;
            var d1up = true;
            var d2Count = 0;
            var d2up = true;
            var d3Count = 0;
            var d3up = true;
            var d4Count = 0;
            var d4up = true;
            var d5Count = 0;
            var d5up = true;


            var HQDotspeed = 0.2;
            var HQDotSpread = [-5,5]

            app.HQdotAnimation = function(delta) {

                if (d1up){
                    d1Count = d1Count + HQDotspeed;
                    if (d1Count >= HQDotSpread[1]){
                        d1up = false;
                    }
                    d1.y = d1Count;
                }
                else{
                    d1Count = d1Count - HQDotspeed;
                    if (d1Count <= HQDotSpread[0]){
                        d1up = true;
                    }
                    d1.y = d1Count;
                }
               
                setTimeout(() => {

                    if (d2up){
                        d2Count = d2Count + HQDotspeed;
                        if (d2Count >= HQDotSpread[1]){
                            d2up = false;
                        }
                        d2.y = d2.y + HQDotspeed;
                    }
                    else{
                        d2Count = d2Count - HQDotspeed;
                        if (d2Count <= HQDotSpread[0]){
                            d2up = true;
                        }
                        d2.y = d2.y - HQDotspeed;
                    }

                }, 120);


                setTimeout(() => {

                    if (d3up){
                        d3Count = d3Count + HQDotspeed;
                        if (d3Count >= HQDotSpread[1]){
                            d3up = false;
                        }
                        d3.y = d3.y + HQDotspeed;
                    }
                    else{
                        d3Count = d3Count - HQDotspeed;
                        if (d3Count <= HQDotSpread[0]){
                            d3up = true;
                        }
                        d3.y = d3.y - HQDotspeed;
                    }

                }, 140);

                setTimeout(() => {

                    if (d4up){
                        d4Count = d4Count + HQDotspeed;
                        if (d4Count >= HQDotSpread[1]){
                            d4up = false;
                        }
                        d4.y = d4.y + HQDotspeed;
                    }
                    else{
                        d4Count = d4Count - HQDotspeed;
                        if (d4Count <= HQDotSpread[0]){
                            d4up = true;
                        }
                        d4.y = d4.y - HQDotspeed;
                    }

                }, 200);

                setTimeout(() => {

                    if (d5up){
                        d5Count = d5Count + HQDotspeed;
                        if (d5Count >= HQDotSpread[1]){
                            d5up = false;
                        }
                        d5.y = d5.y + HQDotspeed;
                    }
                    else{
                        d5Count = d5Count - HQDotspeed;
                        if (d5Count <= HQDotSpread[0]){
                            d5up = true;
                        }
                        d5.y = d5.y - HQDotspeed;
                    }

                }, 240);
                

            }

            app.ticker.add(app.HQdotAnimation);

            HQDotscont.x = 60;
            HQDotscont.y = 40;

            const upDots = new PIXI.Graphics();
            HQcont.addChild(HQmiddle,HQouter, HQDotscont);

            // upDots.beginFill(0xFFFFFF);
            // upDots.moveTo(0, 0);
            // upDots.drawRect(10, 15, 10, 10);
            // upDots.endFill();

            HQcont.mask = graphics

            //  mapCont
            // -148.49615478515625/-158.59686279296875

            HQmiddle.y = 0;

            HQcont.x = -153.20849609375;
            HQcont.y = -298.59686279296875;
            
            // HQcont.width = 105;
            
            // const outlineFilterBlue = new PIXI.filters.OutlineFilter(2, 0x99ff99);
            // const outlineFilterRed = new PIXI.filters.GlowFilter(15, 2, 1, 0xff9999, 0.5);
            // HQouter.filters = [outlineFilterBlue];


            mapCont.addChild(HQcont);


            HQmiddle.shadowColor = "red";
            HQmiddle.shadowBlur = 15;
            
            // HQouter.y = 5;

            var HQspeed = 0.3;
            
            var frameCount = 0;
            let counttx = 0, 
            countup = true;
            
            let HQouterCount = 0,
            HQouterUp = true



            app.HQcontAnimation = function(delta) {

                if (countup){
                    counttx = counttx + HQspeed;
                    if (counttx >= 10){
                        countup = false;
                    }
                    HQmiddle.y = counttx;
                }
                else{
                    counttx = counttx - HQspeed;
                    if (counttx <= -10){
                        countup = true;
                    }
                    HQmiddle.y = counttx;
                }



                setTimeout(() => {
                    if (HQouterUp){
                        HQouterCount = HQouterCount + HQspeed;
                        if (HQouterCount >= 10){
                            HQouterUp = false;
                        }
                        HQouter.y = HQouterCount;
                    }
                    else{
                        HQouterCount = HQouterCount - HQspeed;
                        if (HQouterCount <= -10){
                            HQouterUp = true;
                        }
                        HQouter.y = HQouterCount;
                    }   
                }, 240);
                
                
                console.log(counttx);
            }

            app.ticker.add(app.HQcontAnimation);

        

            // HQcont.height = 80;

            // tall building    
            graphics.beginFill(0xFF3300);
            graphics.moveTo(207.36065673828125, 50.336517333984375);
            graphics.lineTo(207.36065673828125, 50.336517333984375);
            graphics.lineTo(246.3184814453125, 75.02749633789062);
            graphics.lineTo(286.273681640625, 49.90716552734375);
            graphics.lineTo(319.703369140625, -94.63394165039062);
            graphics.lineTo(182.6978759765625,-83.2994384765625)

            graphics.closePath();
            graphics.endFill();


            // train tower

            graphics.beginFill(0xFF3300);
            graphics.moveTo(755.0716552734375, 124.14593505859375);
            graphics.lineTo(755.0716552734375, 124.14593505859375);
            graphics.lineTo(781.2767333984375, 141.64190673828125);
            graphics.lineTo(807.5801391601562, 125.35064697265625);
            graphics.lineTo(827.7238922119141, 40.118499755859375);
            graphics.lineTo(736.787841796875, 45.898223876953125)

            graphics.closePath();
            graphics.endFill();


            // 204.36065673828125/50.336517333984375

            var buttonOneCont = new PIXI.Container()
   

            // buttonOneCont.addChild(graphics);
            app.stage.addChild(mapCont);
            mapCont.addChild(graphics);



            // my shity map drag boundry check
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
                console.log(position.x + '/' + position.y);
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