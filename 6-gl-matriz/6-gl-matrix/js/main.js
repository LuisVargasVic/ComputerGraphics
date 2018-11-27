"use strict"

function main(){
	// Initialization code
	var a = vec3.create();
	vec3.set(a, 1., 0., 0.);
	var b = vec3.fromValues(0., 1., 0.);

	var msg = "a = " + vec3.str(a) + "\n";
	msg = msg + "b = " + vec3.str(b) + "\n";

	var c = vec3.create();
	vec3.add(c, a, b);
	msg = msg + "c = a + b = " + vec3.str(c) + "\n";

	var d = vec3.create();
	vec3.cross(d, a, b);
	msg = msg + "d = a x b = " + vec3.str(d) + "\n";

	var ma = mat3.create()
	mat3.set(ma, 1,2,0,3,4,0,5,6,1);
	var mb = mat3.fromValues(1,2,0,3,4,0,5,6,1);

	var mc = mat3.create()
	mat3.add(mc, ma, mb);
	msg = msg + "Matriz A = " + mat3.str(ma) + "\n";
	msg = msg + "Matriz B = " + mat3.str(mb) + "\n";
	msg = msg + "Matriz C = A + B = " + mat3.str(mc) + "\n";

	var md = mat3.create()
	mat3.multiply(md, ma, mb);
	msg = msg + "Matrix D = AB =" + mat3.str(md) + "\n";

	alert(msg);
}
