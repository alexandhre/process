var shell = require('shelljs');
 
if (!shell.which('git')) {
  shell.echo('Desculpe, este script requer o git.');
  shell.exit(1);
}
 
// Copiar ou remover arquivos
shell.rm('-rf', 'out/Release');
shell.cp('-R', 'stuff/', 'out/Release');
 
// Substituir macros em cada arquivo .js 
shell.cd('lib');
shell.ls('*.js').forEach(function (file) {
  shell.sed('-i', 'BUILD_VERSION', 'v0.1.2', file);
  shell.sed('-i', /^.*LINHA_PARA_REMOVER.*$/, '', file);
  shell.sed('-i', /.*TROCAR_LINHA_QUE_CONTENHA_ISSO.*\n/, shell.cat('macro.js'), file);
});
shell.cd('..');
 
// Executar ferramenta externa de forma síncrona 
if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
  shell.echo('Error: Git commit failed');
  shell.exit(1);
}