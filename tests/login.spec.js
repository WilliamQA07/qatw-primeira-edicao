import { test, expect } from '@playwright/test';
//import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPages';
import { cleanJobs, getJob } from '../support/redis';


test('Não deve logar quando o codigo de verificacao e invalido', async ({ page }) => {

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }
  const loginPage = new LoginPage(page)

  await loginPage.acessapagina()
  await loginPage.informaCpf(usuario.cpf)
  await loginPage.informaSenha(usuario.senha)

  await loginPage.informa2FA('123456')

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar a conta do usuario', async ({ page }) => {

  const loginPage = new LoginPage(page)

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await cleanJobs()

  await loginPage.acessapagina()
  await loginPage.informaCpf(usuario.cpf)
  await loginPage.informaSenha(usuario.senha)

  //checkpoint
  await page.getByRole('heading', {name: 'Verificação em duas etapas'})
    .waitFor({Timeout: 3000})

  const codigo = await getJob()

  //const code = await obterCodigo2FA(usuario.cpf)

  await loginPage.informa2FA(codigo)

  await expect(await loginPage.obtersaldo()).toHaveText('R$ 5.000,00')

});