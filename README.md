# Arcade Mobile — projeto inicial

Projeto React + Vite de uma biblioteca de jogos inspirada em sites de arcade, com layout responsivo para Android.

## O que já existe
- Página inicial responsiva com identidade visual própria.
- Catálogo demonstrativo com pesquisa e filtros por categoria.
- Favoritos salvos durante a sessão.
- Tela individual de jogo com controles de toque e uma demo de interface interativa.
- Slot preparado para integrar um emulador web.
- Manifesto básico de PWA para permitir preparação para “Adicionar à tela inicial”.

## Rodar localmente
É necessário ter Node.js 18+ instalado.

```bash
npm install
npm run dev
```

Para testar a versão de produção:

```bash
npm run build
npm run preview
```

## Publicar com um link
Uma opção simples é usar Vercel ou Netlify:
1. Crie um repositório no GitHub e envie os arquivos deste projeto.
2. Importe o repositório na Vercel ou Netlify.
3. Use `npm run build` como comando de build e `dist` como pasta de saída.
4. Conclua a publicação e use o endereço gerado pela plataforma.

## Importante sobre jogos reais
Os jogos no catálogo são exemplos de interface, não uma coleção de jogos comerciais completos. Antes de publicar, substitua os exemplos por jogos HTML5 próprios ou com licença/permissão de distribuição. Para emuladores, integre uma solução web compatível e permita somente o uso de jogos/arquivos que o visitante tenha autorização para usar. O projeto não inclui ROMs nem BIOS.

## Próximos passos recomendados
- Adicionar jogos HTML5 reais com licenças claras.
- Integrar emulador web legalmente utilizável, após escolher as plataformas.
- Melhorar PWA com ícones, cache offline e testes em Android.
- Persistir favoritos com localStorage ou conta de usuário.
