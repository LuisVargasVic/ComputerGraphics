"use strict"

// global variables
var canvas;
var gl;
var positionsSingle, positionsMultiple;
var colors; // triangle 2
var color;  // triangle 1
var shaderProgramSingle, shaderProgramMultiple;
var aPositionSingle, aPositionMultiple, aColor, uColor;
var vboPositionSingle, vboColors, vboPositionMultiple;

function initRenderingContext()
{
	canvas = document.getElementById("canvas");
	// Get a WebGL Context
	gl = canvas.getContext("webgl");
	if(gl)
	{
		// Set the clear Color
		gl.clearColor(0., 0., 0., 1.);	// black
	}
	return gl;
}

function initScene()
{
	positionsSingle = [ -0.5,  0.5, // V0
			     		-0.5, -0.5,	// v1
				 		 0.5, -0.5	// V2
					];
	positionsMultiple = [ 	-0.5,  0.5, // V0
							 0.5, -0.5,	// v1
							 0.5,  0.5	// V2
					];

	color = [	1., 0., 0., 1.];

	colors = [	1., 0., 0., 1.,
				0., 1., 0., 1.,
				0., 0., 1., 1.];
}

function initShaders()
{
	// Shader Program Single
	// Get Source for vertex & fragment shaders
	var singleShaderSrc = document.getElementById("shaderSingleColor-vs").text;
	var multipleShaderSrc = document.getElementById("shaderMultipleColor-vs").text;
	var fragmentShaderSrc = document.getElementById("shader-fs").text;

	// Create GLSL shaders (upload source & compile shaders)
	var singleShader = createShader(gl, gl.VERTEX_SHADER, singleShaderSrc);
	var multipleShader = createShader(gl, gl.VERTEX_SHADER, multipleShaderSrc);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

	// Link the two shaders into a shader program
	shaderProgramSingle = createShaderProgram(gl, singleShader, fragmentShader);
	shaderProgramMultiple = createShaderProgram(gl, multipleShader, fragmentShader);

	// Look up into the vertex shader where the CPU's vertex data go
	aPositionSingle = gl.getAttribLocation(shaderProgramSingle, "aPosition");
	aPositionMultiple = gl.getAttribLocation(shaderProgramMultiple, "aPosition");
	aColor = gl.getAttribLocation(shaderProgramMultiple, "aColor");
	uColor = gl.getUniformLocation(shaderProgramSingle, "uColor");
}

function initBuffers()
{
	// Positions VBO Single Color
	// Create a GPU's Vertex Buffer Object (VBO) and put clip-space vertex data 
	vboPositionSingle = gl.createBuffer();

	// Bind the VBO to ARRAY_BUFFER
	gl.bindBuffer(gl.ARRAY_BUFFER, vboPositionSingle);

	// Upload CPU's vertex data into the GPU's VBO
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionsSingle), gl.STATIC_DRAW);

	// Positions VBO Multiple Color
	// Create a GPU's Vertex Buffer Object (VBO) and put clip-space vertex data 
	vboPositionMultiple = gl.createBuffer();

	// Bind the VBO to ARRAY_BUFFER
	gl.bindBuffer(gl.ARRAY_BUFFER, vboPositionMultiple);

	// Upload CPU's vertex data into the GPU's VBO
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positionsMultiple), gl.STATIC_DRAW);

	// Positions VBO Multiple Color
	// Create a GPU's Vertex Buffer Object (VBO) and put clip-space vertex data 
	vboColors = gl.createBuffer();

	// Bind the VBO to ARRAY_BUFFER
	gl.bindBuffer(gl.ARRAY_BUFFER, vboColors);

	// Upload CPU's vertex data into the GPU's VBO
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

function renderScene()
{
	// Clear the framebuffer (canvas)
	gl.clear(gl.COLOR_BUFFER_BIT);
				
	// Mapping from clip-space coords to the viewport in pixels
	gl.viewport(0, 0, canvas.width, canvas.height);
				
	// Tell WebGL which shader program to use (vertex & fragments shaders)
	gl.useProgram(shaderProgramSingle);

	// Load uniform data to GPU
	gl.uniform4fv(uColor, color);
				
	// Turn on the attribute variable
	gl.enableVertexAttribArray(aPositionSingle);
				
	// Bind to a VBO
	gl.bindBuffer(gl.ARRAY_BUFFER, vboPositionSingle);
				
	// Tell the attribute (in) how to get data out of VBO
	var size = 2;			// 2 elements (x, y) per iteration
	var type = gl.FLOAT;	// 32 bit floats
	var normalize = false; 	// do not normalize the data
	var stride = 0;			// move forward size*sizeof(type) each iter to get next pos
	var offset = 0;			// start at the beginning of the VBO
	gl.vertexAttribPointer(aPositionSingle, size, type, normalize, stride, offset);
				
	// Draw the scene
	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 3;	
	gl.drawArrays(primitiveType, offset, count);
				
	// Tell WebGL which shader program to use (vertex & fragments shaders)
	gl.useProgram(shaderProgramMultiple);
				
	// Turn on the attribute variable
	gl.enableVertexAttribArray(aPositionMultiple);
				
	// Bind to a VBO
	gl.bindBuffer(gl.ARRAY_BUFFER, vboPositionMultiple);
				
	// Tell the attribute (in) how to get data out of VBO
	var size = 2;			// 2 elements (x, y) per iteration
	var type = gl.FLOAT;	// 32 bit floats
	var normalize = false; 	// do not normalize the data
	var stride = 0;			// move forward size*sizeof(type) each iter to get next pos
	var offset = 0;			// start at the beginning of the VBO
	gl.vertexAttribPointer(aPositionMultiple, size, type, normalize, stride, offset);
				
	// Draw the scene
	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 3;	
	gl.drawArrays(primitiveType, offset, count);

	gl.enableVertexAttribArray(aColor);
				
	// Bind to a VBO
	gl.bindBuffer(gl.ARRAY_BUFFER, vboColors);
				
	// Tell the attribute (in) how to get data out of VBO
	var size = 4;			// 4 elements (r, g, b, a) per iteration
	var type = gl.FLOAT;	// 32 bit floats
	var normalize = false; 	// do not normalize the data
	var stride = 0;			// move forward size*sizeof(type) each iter to get next pos
	var offset = 0;			// start at the beginning of the VBO
	gl.vertexAttribPointer(aColor, size, type, normalize, stride, offset);

	// Draw the scene
	var primitiveType = gl.TRIANGLES;
	var offset = 0;
	var count = 3;	
	gl.drawArrays(primitiveType, offset, count);
}

function main()
{
	// Initialization code
	gl = initRenderingContext();
	if(!gl)
	{
		return;
	}
	else
	{
		initScene();
		initShaders();
		initBuffers();

		// Rendering code
		renderScene();
	}
}
