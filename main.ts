const developerJokes = [
	"¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.",
	"Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'",
	"¡He terminado mi código a tiempo! – Nadie, nunca.",
	"Si no funciona, añade más `console.log()`.",
	"¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.",
	"No me asusto fácilmente... excepto cuando veo código sin `;` al final.",
	"Los desarrolladores no envejecen, solo se depuran.",
	"El único lugar donde puedes escapar de una excepción es en Java.",
	"Frontend sin diseño es como un backend sin lógica.",
	"¿Por qué los programadores prefieren el té? Porque en Java no hay café.",
	"Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.",
	"Siempre prueba tu código... excepto cuando funciona.",
	"Tu código no está roto, solo es 'funcionalidad no documentada'.",
	"En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.",
	"Mi código funciona... hasta que lo toco de nuevo.",
	"¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.",
	"Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.",
	"Git es como un horóscopo: nunca entiendes los conflictos.",
	"Un desarrollador sin bugs es como un unicornio, no existe.",
	"En mi máquina funciona... pero no en producción.",
];

const handler = (req: Request): Response => {
	const method = req.method;
	const url = new URL(req.url);
	const path = url.pathname;
	const params = url.searchParams;

	if (method == "GET") {
		if (path.startsWith("/jokes")) {
			let index: number | null = Number(path.split("/").at(2));
			if (index) {
				return new Response(developerJokes[index], {
					status: 200,
				});
			}
			index = Math.round(Math.random() * developerJokes.length - 1);
			return new Response(JSON.stringify(developerJokes[index]), {
				status: 200,
			});
		} else if (path.startsWith("/calcular")) {
			const n1: number = Number(params.get("num1"));
			const n2: number = Number(params.get("num2"));
			const op = params.get("op");
			let resultado: number;

			if (n2 === 0)
				return new Response("Error: No se puede dividir por 0", {
					status: 200,
				});

			if (!n1 || !n2 || !op)
				return new Response("Bad request. Missing param.", { status: 400 });
			if (op === "suma") {
				resultado = n1 + n2;
				return new Response(
					`El resultado de sumar ${n1} y ${n2} es ${resultado}`
				);
			} else if (op === "resta") {
				resultado = n1 - n2;
				return new Response(
					`El resultado de restar ${n1} y ${n2} es ${resultado}`
				);
			} else if (op === "multiplicar") {
				resultado = n1 * n2;
				return new Response(
					`El resultado de multiplicar ${n1} y ${n2} es ${resultado}`
				);
			} else if (op === "dividir") {
				resultado = n1 / n2;
				return new Response(
					`El resultado de dividir ${n1} y ${n2} es ${resultado}`
				);
			}
		} else if (path.startsWith("/reverso")) {
			const frase: string | undefined = path.split("/").at(2);
			const detalles: boolean | undefined = Boolean(params.get("detalles"));
			if (!frase)
				return new Response("Bad request. Missing param.", { status: 400 });
			const reverso: string = frase
				.split("")
				.reduce((acc, char) => (acc = char + acc), "")
				.replaceAll("02%", " ");
			if (detalles)
				return new Response(
					JSON.stringify(
						`{"reverso": "${reverso}", "longitud": ${reverso.length}}`
					)
				);
			return new Response(reverso, { status: 200 });
		}
	}
	return new Response("Path not found", { status: 404 });
};

Deno.serve({ port: 4000 }, handler);
