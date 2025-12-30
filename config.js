// config.js
const SUPABASE_URL = 'https://pjxrkhrtqkvxtjhopohx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-51Tg7zfwk5PsBWw2dzulw_eyUM-Mzu';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let userBranch = "";

async function checkAuth() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
        return null;
    }
    const { data } = await _supabase.from('profiles').select('*').eq('id', session.user.id).single();
    if (data) userBranch = data.branch;
    return session.user;
}

async function logout() {
    await _supabase.auth.signOut();
    window.location.href = 'index.html';
}