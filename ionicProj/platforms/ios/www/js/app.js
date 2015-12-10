// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',
    [
        'ionic',
        'app.controllers',
        'app.services',
        'user.controllers',
        'user.services'
    ]
)
/**
 * see documentation: https://www.parse.com/apps/quickstart#parse_data/web/existing
 *
 * SET THESE VALUES IF YOU WANT TO USE PARSE, COMMENT THEM OUT TO USE THE DEFAULT
 * SERVICE
 *
 * parse constants
 */

    .value('ParseConfiguration', {
        applicationId: "OmsGMVVEXlyeH7ogBUCxYBYrhTxskALiSyUI3NQ4",
        javascriptKey: "IxFoJ67sWnY97WVgFPSpesiXhccPLWEdrCs3EMuj"
    })
/**
 *
 */
    .config(function ($stateProvider, $urlRouterProvider) {

        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            // create account state
            .state('app-signup', {
                url: "/signup",
                templateUrl: "templates/user/signup.html",
                controller: "SignUpController"
            })
            // login state that is needed to log the user in after logout
            // or if there is no user object available
            .state('app-login', {
                url: "/login",
                templateUrl: "templates/user/login.html",
                controller: "LoginController"
            })

            // setup an abstract state for the tabs directive, check for a user
            // object here is the resolve, if there is no user then redirect the
            // user back to login state on the changeStateError
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                resolve: {
                    user: function (UserService) {
                        var value = UserService.init();
                        return value;
                    }
                }
            })

            // Each tab has its own nav history stack:
            .state('tab.list', {
                url: '/list',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/tab-list.html',
                        controller: 'ListCtrl'
                    }
                }
            })

            .state('tab.list-detail', {
                url: '/list/:itemId',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/cardboardView.html',
                        controller: 'CardboardCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                cache: false,
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/list');

    })
    .run(function ($ionicPlatform, $rootScope, $state) {


        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {

                debugger;

                console.log('$stateChangeError ' + error && (error.debug || error.message || error));

                // if the error is "noUser" the go to login state
                if (error && error.error === "noUser") {
                    event.preventDefault();

                    $state.go('app-login', {});
                }
            });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

.directive('cardboardGl', [function() {

  return {
    restrict: 'E',
    scope: {
       sphereUrl: '=sphere',
       isPhoto: '=photo'
    },
    link: function($scope, $element, $attr) {
      create($element[0], $scope.sphereUrl, $scope.isPhoto);
    }
  }


  function create(glFrame, sphereUrl, isPhoto) {
    var scene,
        camera,
        renderer,
        element,
        container,
        effect,
        controls,
        clock,

        // Particles
        particles = new THREE.Object3D(),
        totalParticles = 200,
        maxParticleSize = 200,
        particleRotationSpeed = 0,
        particleRotationDeg = 0,
        lastColorRange = [0, 0.3],
        currentColorRange = [0, 0.3],
         video, videoImage, videoImageContext, videoTexture;


      init();
    
      if(isPhoto == true){
        console.log("This item is a picture");
      }
      console.log("isPicture value: " + isPhoto);
      

    console.log(sphereUrl);


    function init() {
      scene = new THREE.Scene();
      //Was 90 for first value and .001 for second value
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      //camera.position.set(0, 50, 0);
        camera.position.set(0, 0, 0);
        
      scene.add(camera);
      
     

      renderer = new THREE.WebGLRenderer();
      element = renderer.domElement;
      container = glFrame;
      container.appendChild(element);

      effect = new THREE.StereoEffect(renderer);

      // Our initial control fallback with mouse/touch events in case DeviceOrientation is not enabled
      controls = new THREE.OrbitControls(camera, element);
      controls.target.set(
        camera.position.x + 0.000001,
        camera.position.y,
        camera.position.z
      );
      controls.noPan = true;
      controls.noZoom = true;

      // Our preferred controls via DeviceOrientation
      function setOrientationControls(e) {
        if (!e.alpha) {
          return;
        }

        controls = new THREE.DeviceOrientationControls(camera, true);
        controls.connect();
        controls.update();

        element.addEventListener('click', fullscreen, false);

        window.removeEventListener('deviceorientation', setOrientationControls, true);
      }
      window.addEventListener('deviceorientation', setOrientationControls, true);
        
    
      // Lighting
        
        var newlight = new THREE.SpotLight(0xffffff);
        newlight.position.set( -150, 150, 150 );

        var pointLight = new THREE.PointLight( 0xffffff);
        pointLight.position.set( -50, 50, 50 );

        scene.add(newlight);
        scene.add(pointLight);
    
      var directionalLight = new THREE.DirectionalLight( 0xffffff );
      directionalLight.position.set( 0, 50, 0 ).normalize();
      scene.add( directionalLight );
          
      var secondDirectionalLight = new THREE.DirectionalLight (0xffffff);
      secondDirectionalLight.position.set(0,0,0).normalize();
      
      var ambient = new THREE.AmbientLight( 0xffffff);
      scene.add( ambient ); 
      
      var light = new THREE.PointLight(0xFFFFFF, 2, 100);
      light.position.set(0, 0, 0);
      scene.add(light);

      //creating a sphere

      //var urlSplit = sphereUrl.split('/');
      if(isPhoto){
        var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(128, 128, 64),
        new THREE.MeshPhongMaterial({
          //map: THREE.ImageUtils.loadTexture(urlSplit[urlSplit.length - 1])
        map: THREE.ImageUtils.loadTexture(sphereUrl)
        })
        );
        //sphere.position.set(5, 100, 0);
        sphere.position.set(0,0,0);
        sphere.scale.x = -1;
        scene.add(sphere); 
      } 
    else {
      ///////////
    // VIDEO //
    ///////////
    
    // create the video element
    video = document.createElement( 'video' );
    // video.id = 'video';
    // video.type = ' video/ogg; codecs="theora, vorbis" ';
    video.id = 'video';
    video.src = sphereUrl;
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    video.load(); // must call after setting/changing source
   
    
    videoImage = document.createElement( 'canvas' );
    videoImage.width = 3840;
    videoImage.height = 2160;

    videoImageContext = videoImage.getContext( '2d' );
    // background color if no video present
    videoImageContext.fillStyle = '#FFFFFF';
    videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

    videoTexture = new THREE.Texture( videoImage );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    
    var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
    // the geometry on which the movie will be displayed;
    //      movie image will be scaled to fit these dimensions.
    var movieGeometry = new THREE.SphereGeometry(360, 360,360);
    
    var movieScreen = new THREE.Mesh( 
        movieGeometry, 
        movieMaterial );
          
    movieScreen.position.set(0,50,0);
    movieScreen.scale.x = -1;
    scene.add(movieScreen);
        
    video.play();
      
    }
 
        
        
    
    
        // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,250,0);
    scene.add(light);
    
    camera.position.set(0,0,0);
    //camera.lookAt(movieScreen.position)
               
      /*var floorTexture = THREE.ImageUtils.loadTexture('img/textures/wood.jpg');
      floorTexture.wrapS = THREE.RepeatWrapping;
      floorTexture.wrapT = THREE.RepeatWrapping;
      floorTexture.repeat = new THREE.Vector2(50, 50);
      floorTexture.anisotropy = renderer.getMaxAnisotropy();

      var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        shininess: 20,
        shading: THREE.FlatShading,
        map: floorTexture
      });

      var geometry = new THREE.PlaneBufferGeometry(1000, 1000);

      var floor = new THREE.Mesh(geometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      //scene.add(floor);

      var particleTexture = THREE.ImageUtils.loadTexture('img/textures/particle.png'),
          spriteMaterial = new THREE.SpriteMaterial({
          map: particleTexture,
          color: 0xffffff
        });

      for (var i = 0; i < totalParticles; i++) {
        var sprite = new THREE.Sprite(spriteMaterial);

        sprite.scale.set(64, 64, 1.0);
        sprite.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.75);
        sprite.position.setLength(maxParticleSize * Math.random());

        sprite.material.blending = THREE.AdditiveBlending;

        particles.add(sprite);
      }
      particles.position.y = 70;
      //scene.add(particles);*/
     

      //adjustToWeatherConditions();

      clock = new THREE.Clock();

      animate();
    }
      
    function animate() {

      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();
      controls.update(dt);
    }

    function render(dt) {
      effect.render(scene, camera);
        if(!isPhoto){
            videoImageContext.drawImage( video, 0, 0 );
        }
        if ( videoTexture ) 
            videoTexture.needsUpdate = true;
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }

    function getURL(url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
           if (xmlhttp.status == 200){
               callback(JSON.parse(xmlhttp.responseText));
           }
           else {
               console.log('We had an error, status code: ', xmlhttp.status);
           }
        }
      }

      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }
  }
}]);
