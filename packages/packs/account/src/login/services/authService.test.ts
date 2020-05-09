import ClientOAuth2 from 'client-oauth2';
import { AuthService } from './authService';

jest.mock('client-oauth2');

beforeEach(() => {
	ClientOAuth2.mockClear();
});

it('error should not be a success', async () => {
	const auth = new AuthService({
		clientId: '',
		clientSecret: '',
		accessTokenUri: '',
		authorizationUri: '',
		redirectUri: '',
		scopes: ['scope'],
	});

	const result = await auth.login('throw', 'password');

	expect(result.success).toBeFalsy();
});

it('success should be a success', async () => {
	const auth = new AuthService({
		clientId: '',
		clientSecret: '',
		accessTokenUri: '',
		authorizationUri: '',
		redirectUri: '',
		scopes: ['scope'],
	});

	const result = await auth.login('username', 'password', 'tenantid');

	expect(result.success).toBeTruthy();
});
