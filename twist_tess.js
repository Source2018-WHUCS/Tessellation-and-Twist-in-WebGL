
    var gl;
    var canvas;

    function setup(){
        /*============== Creating a canvas ====================*/
        canvas = document.getElementById('my_Canvas');
        gl = canvas.getContext('experimental-webgl');
        
        /*============== Render info ====================*/
        // Clear the canvas
        gl.clearColor(0.5, 0.5, 0.5, 0.9);

        // Clear the color buffer bit
        gl.clear(gl.COLOR_BUFFER_BIT);

    }

    setup();

   /*============== Vertices Declaration ====================*/
   //Set vertices for triangle, square, pentagon, hexagon, octagon

   var tri  =[
        -0.61,-0.35,0,
        0,0.7,0,
        0.61, -0.35,0.0
    ];

        var vertices1 = [	
            -0.5,0.5,0.0,	
            -0.5,-0.5,0.0,	
            0.5,-0.5,0.0,
            
            -0.5,0.5,0.0,
            0.5, -0.5,0,
            0.5, 0.5, 0,

            0,0,0,
            0,0.5,0,
            0.5*Math.cos(0.314159), 0.5*Math.sin(0.3141598),0,

            0,0,0,
            0.5*Math.cos(0.314159), 0.5*Math.sin(0.314159),0,
            0.5*Math.cos(-0.942478), 0.5*Math.sin(-0.942478),0,

 
            0,0,0,
            0,0.5,0,
            -0.5*Math.cos(0.314159), 0.5*Math.sin(0.314159),0,

            0,0,0,
            -0.5*Math.cos(0.314159), 0.5*Math.sin(0.314159),0,
            -0.5*Math.cos(0.942478),-0.5*Math.sin(0.942478),0,


            0,0,0,
            -0.5*Math.cos(0.942478),-0.5*Math.sin(0.942478),0,
            0.5*Math.cos(-0.942478), 0.5*Math.sin(-0.942478),0,

        ];

        var hex_oct = [
        0,0,0,
        -0.5*Math.sin(0.523599), 0.5*Math.cos(0.523599),0,
        0.5*Math.sin(0.523599), 0.5*Math.cos(0.523599),0,

        0,0,0,
        0.5*Math.sin(0.523599), 0.5*Math.cos(0.523599),0,
        0.5,0,0,

        0,0,0,
        -0.5*Math.sin(0.523599), 0.5*Math.cos(0.523599),0,
        -0.5,0,0,

        0,0,0,
        0.5,0,0,
        0.5*Math.sin(0.523599), -0.5*Math.cos(0.523599),0,

        0,0,0,
        0.5*Math.sin(0.523599), -0.5*Math.cos(0.523599),0,
        -0.5*Math.sin(0.523599), -0.5*Math.cos(0.523599),0,

        0,0,0,
        -0.5*Math.sin(0.523599), -0.5*Math.cos(0.523599),0,
        -0.5,0,0


    ];

    var Octa = [
        0,0,0,
        0,0.5,0,
        0.5*Math.cos(0.785398), 0.5*Math.sin(0.785398),0,

        0,0,0,
        0.5*Math.cos(0.785398), 0.5*Math.sin(0.785398),0,
        0.5,0,0,

        0,0,0,
        0.5,0,0,
        0.5*Math.sin(0.785398), -0.5*Math.cos(0.785398),0,

        0,0,0,
        0.5*Math.sin(0.785398), -0.5*Math.cos(0.785398),0,
        0,-0.5,0,

        0,0,0,
        0,-0.5,0,
        -0.5*Math.sin(0.785398), -0.5*Math.cos(0.785398),0,

        0,0,0,
        -0.5*Math.sin(0.785398), -0.5*Math.cos(0.785398),0,
        -0.5,0,0,

        0,0,0,
        -0.5,0,0,
        -0.5*Math.cos(0.785398), 0.5*Math.sin(0.785398), 0,

        0,0,0,
        -0.5*Math.cos(0.785398), 0.5*Math.sin(0.785398), 0,
        0,0.5,0

    ];
    /*============== Color Declaration ====================*/
   //Colors for overlapping triangles
//    var colorA = [ 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0];

//     //Colors for the twisted triangles
//     var colorB = [ 1,0,0, 1,0,0,  1,0,0];
    


    /*============== Indices Declaration ====================*/
   //Declare indices for triangle
   var indices = [0,1,2];
   var indices3 = [3,4,5];


    /*============== Translation Declaration ====================*/
   //Declare translation for triangle
   var translate0 = [0, 0];

   
   /* This function draw a shape by accepting three arguments .
   args: primitives - primitive shape type 
         vertices   - the vertices that makes the points -               matrix
         translate  - the coordinate where the shape will be translated- matrix
         colors     - the color -                                        matrix
         angle      - the angle of rotation                              matrix
   */
   function drawA(primitive, vertices, translate, colors, indices){

      /*======== Defining and storing the geometry ===========*/
      //indices = [0,1,2];
   
      // Create an empty buffer object to store vertex buffer
      var vertex_buffer = gl.createBuffer();

      // Bind appropriate array buffer to it
      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
      
      // Pass the vertex data to the buffer
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

      // Unbind the buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      // Create an empty buffer object to store Index buffer
      var Index_Buffer = gl.createBuffer();

      // Bind appropriate array buffer to it
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

      // Pass the vertex data to the buffer
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      
      // Unbind the buffer
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

      // Create an empty buffer object and store color data
      var color_buffer = gl.createBuffer ();
      gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);


      /*================ Shaders ====================*/
   
      // Vertex shader source code
      var vertCode =
         'attribute vec3 coordinates;' +
         'attribute vec3 color;'+
         'varying vec3 vColor;'+

         'uniform vec4 translation;'+

         
         'void main(void) {' +
            ' gl_Position = vec4(coordinates, 1) + translation;' +
            'vColor = color;'+
         '}';
         
      // Create a vertex shader object
      var vertShader = gl.createShader(gl.VERTEX_SHADER);

      // Attach vertex shader source code
      gl.shaderSource(vertShader, vertCode);

      // Compile the vertex shader
      gl.compileShader(vertShader);

      //fragment shader source code
      var fragCode = 'precision mediump float;'+
         'varying vec3 vColor;'+
         'void main(void) {' +
            ' gl_FragColor = vec4(vColor, 1);' +
         '}';
         
      // Create fragment shader object
      var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

      // Attach fragment shader source code
      gl.shaderSource(fragShader, fragCode); 
      
      // Compile the fragmentt shader
      gl.compileShader(fragShader);

      // Create a shader program object to store
      // the combined shader program
      var shaderProgram = gl.createProgram();

      // Attach a vertex shader
      gl.attachShader(shaderProgram, vertShader);

      // Attach a fragment shader
      gl.attachShader(shaderProgram, fragShader);

      // Link both the programs
      gl.linkProgram(shaderProgram);

      // Use the combined shader program object
      gl.useProgram(shaderProgram);

      /*======= Associating shaders to buffer objects =======*/

      // Bind vertex buffer object
      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

      // Bind index buffer object
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

      // Get the attribute location
      var coord = gl.getAttribLocation(shaderProgram, "coordinates");

      // Point an attribute to the currently bound VBO
      gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); 

      // Enable the attribute
      gl.enableVertexAttribArray(coord);



      // bind the color buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
      
      // get the attribute location
      var color = gl.getAttribLocation(shaderProgram, "color");

      // point attribute to the volor buffer object
      gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;

      // enable the color attribute
      gl.enableVertexAttribArray(color);


      /* ==========translation======================================*/
      var Tx = translate[0] , Ty = translate[1] , Tz = 0.0;
      var translation = gl.getUniformLocation(shaderProgram, 'translation');
      gl.uniform4f(translation, Tx, Ty, Tz, 0.0);


      /*=========Drawing the triangle===========*/

      // Set the view port
      gl.viewport(0,0,canvas.width,canvas.height);

      drawToScreen(shaderProgram, primitive, indices.length);

   }

   /*This function draws the shape to the screen
   args: shaderProgram  this is the shader program
         prim - primitive shape type                                         
         num_indices The indices array defines each face like a pair of triangles   - matrix
         angle      - the angle of rotation                                         - matrix
   */
   function drawToScreen(shaderProgram , prim, num_indices){

      // Draw the triangle
      gl.drawElements(prim, num_indices, gl.UNSIGNED_SHORT,0);
      

   }

   /*=======================Tessellate triangle========================*/
   //Calulates the new point for the next triangle
   function mid_point(v1, v2){
        var v3 = [];
        for(var i=0; i < 3; i++){
            v3.push( (v1[i] + v2[i])/2.0 );
        }
        return v3;
    }

    //Put all the points in one list
    function generateNewTriangle(point1, point2, point3){
        var triangle = []

        //Put the x, y and z value of point1 into the list
        for(var i=0; i < 3; i++){
            triangle.push(point1[i]);
        }

        //Put the x, y and z value of point2 into the list
        for(var i=0; i < 3; i++){
            triangle.push(point2[i]);
        }

        //Put the x, y and z value of point3 into the list
        for(var i=0; i < 3; i++){
            triangle.push(point3[i]);
        }

        return triangle;
    }

    function tessellate_triangle(trianglePoints, count, translate, angle, primitive = gl.LINE_LOOP, color){

        var new_points = [
            trianglePoints[0], trianglePoints[1], trianglePoints[2],
            trianglePoints[3], trianglePoints[4], trianglePoints[5],
            trianglePoints[6], trianglePoints[7], trianglePoints[8],
        ];

        if (count == 0){
            var twisted_points = twist(new_points, angle);
            drawA(primitive, twisted_points, translate, color,indices);
        }
        else {
            //Point A, B, and C of the original triangle
            var a = [trianglePoints[0], trianglePoints[1], trianglePoints[2]];
            var b = [trianglePoints[3], trianglePoints[4], trianglePoints[5]];
            var c = [trianglePoints[6], trianglePoints[7], trianglePoints[8]];

            //Calculate the middle point on line AB, line AC and line BC
            var ab = mid_point(a, b);
            var ac = mid_point(a, c);
            var bc = mid_point(b, c);


            //Generate new triangle
            var triangle_a_ab_ac = generateNewTriangle(a, ab, ac)
            var triangle_c_ac_bc = generateNewTriangle(c, ac, bc)
            var triangle_b_bc_ab = generateNewTriangle(b, bc, ab)
            var triangle_ab_ac_bc = generateNewTriangle(ab, ac, bc)

            --count;

            //Tessellate new triangles
            tessellate_triangle(triangle_a_ab_ac, count, translate, angle, primitive, color);
            tessellate_triangle(triangle_c_ac_bc, count, translate, angle, primitive, color);
            tessellate_triangle(triangle_b_bc_ab, count, translate, angle, primitive, color);
            tessellate_triangle(triangle_ab_ac_bc, count, translate, angle, primitive, color);
        }                
    }

    /*=======================Twist the triangle========================*/
    //Takes a triangle gets the points and twist them
    function twist_point(point, angle){
        var x = point[0];
        var y = point[1];
        var z = point[2];

        
        var magnitude = Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
        var radian = Math.PI * angle / 180.0;

        var sinAngle = Math.sin(magnitude * radian);
        var cosAngle = Math.cos(magnitude * radian);

        var point = [x * cosAngle - y * sinAngle, x * sinAngle + y * cosAngle, z];
        return point;

    }

    function twist(triang_points, angle){

        //Gets the point X,Y,Z for each point.
        var point_a = [triang_points[0], triang_points[1], triang_points[2]];
        var point_b = [triang_points[3], triang_points[4], triang_points[5]];
        var point_c = [triang_points[6], triang_points[7], triang_points[8]];
        
        //twist each point
        var new_point_a = twist_point(point_a, angle);
        var new_point_b = twist_point(point_b, angle);
        var new_point_c = twist_point(point_c, angle);

        //Create new triangle array with twisted point
        var newTriangPoint = generateNewTriangle(new_point_a, new_point_b, new_point_c);
        //console.log(newTriangPoint)

        return newTriangPoint;
    }

    function subdivideShape(){

        //Get the shape selected
        var shape = document.querySelector('input[name="shape-radio"]:checked');
      

        //Get number of subdivison
        var subdivide = document.querySelector('input[name="Tesselation-radio"]:checked');
        subdivide = parseInt(subdivide.value);

        //Get the view
        var view = document.querySelector('input[name="display"]:checked');
        if(view.id == "Wire Frame"){
            view = gl.LINE_LOOP;
        }else{
            view = gl.TRIANGLES;
        }

        //Get Shading
        var shading = document.querySelector('input[name="shading"]:checked');
        var color = [];
        if (shading.id == "Flat"){
            
            color =  [ 1,0,0, 1,0,0, 1,0,0 ];
        }else{
            //color = [ 1,.6,0.7, 0,1,.7,  .3,0,1];
            color = [ 0.4,0,.9, .1,.8,.7, .6,.65,.34 ];
        }
       
        //Get the twist
        var t = document.getElementById('myRange');


        var twist_slide = document.getElementById('twist-range');
        var angle = t.value;
        //document.getElementById('rotation-text').innerHTML = angle;
        //document.getElementById('rotation-text').innerHTML = angle;
    
        //Call the shape function
        if(shape.id == "triangle"){
            triangle(view, subdivide, angle, color);
        }else if (shape.id == "square"){
            square(view, subdivide, angle, color);
        }else if (shape.id == "pentagon"){
            pentagon(view, subdivide, angle, color);
        }else if (shape.id == 'hexagon'){
            hexagon(view,subdivide,angle,color);
        }else if(shape.id == 'octagon'){
            octagon(view,subdivide,angle, color);
        }

    }

    function triangle(display, subdivide, angle, colors1){
        setup();
        tessellate_triangle(tri.slice(0,10), subdivide, translate0, angle, display, colors1)

    }

    function square(display, subdivide,angle, colors1){
        setup();     
        tessellate_triangle(vertices1.slice(0,9), subdivide, translate0, angle, display, colors1) //Twist with tessellation
        tessellate_triangle(vertices1.slice(9,18), subdivide, translate0, angle, display, colors1)

    }

    
    function pentagon(display, subdivide,angle,colors1){
        setup();     
        tessellate_triangle(vertices1.slice(18,27),  subdivide, translate0, angle, display, colors1)
        tessellate_triangle(vertices1.slice(27,36), subdivide, translate0, angle, display, colors1)
        tessellate_triangle(vertices1.slice(36,45), subdivide,translate0, angle, display,colors1)
        tessellate_triangle(vertices1.slice(45,54), subdivide,translate0,angle, display,colors1)
        tessellate_triangle(vertices1.slice(54,63), subdivide,translate0,angle,display,colors1)
    }

    function hexagon(display, subdivide, angle,colors1){
        setup();
        tessellate_triangle(hex_oct.slice(0,9), subdivide,translate0,angle,display,colors1)
        tessellate_triangle(hex_oct.slice(9,18),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(hex_oct.slice(18,27),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(hex_oct.slice(27,36),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(hex_oct.slice(36,45),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(hex_oct.slice(45,54),subdivide,translate0,angle,display,colors1)

    }

    function octagon(display, subdivide, angle,colors1){
        setup();
        tessellate_triangle(Octa.slice(0,9), subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(9,18),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(18,27),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(27,36),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(36,45),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(45,54),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(54,63),subdivide,translate0,angle,display,colors1)
        tessellate_triangle(Octa.slice(63,72),subdivide,translate0,angle,display,colors1)
    }
