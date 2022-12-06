import Layout from '../../components/layout';
import { app } from '../../src/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import  { useEffect, useState } from 'react';

export default function Index() {
    const [message, setMessage] = useState('wait...');

    // 1. Authオブジェクトを取得する
    const auth = getAuth(app);
    // 2. 認証プロバイダーを作成する
    const googleProvider = new GoogleAuthProvider();

    // useEffect(() => {
    //     // 3. ポップアップでGoogle認証する
    //     signInWithPopup(auth, googleProvider).then((result) => {
    //         setMessage(`logined: ${result.user.displayName}`);
    //     });
    // }, []);

    const clickSignOut = (e) => {
        //サインアウトする
        signOut(auth).then((_) => {
            setMessage('no login');
        });
    };

    const clickSignIn = (e) => {
        // 3. ポップアップでGoogle認証する
        signInWithPopup(auth, googleProvider).then((result) => {
            setMessage(`logined: ${result.user.displayName}`);
        });
    };

    return (
        <div>
            <Layout header="Next.js" title="ユーザ情報">
                <div className="text-end">
                    {auth.currentUser != null ? (
                        <button className="btn btn-primary" onClick={clickSignOut}>
                            サインアウト
                        </button>
                    ) : (
                        <button className="btn btn-primayr" onClick={clickSignIn}>
                            サインイン
                        </button>
                    )}
                </div>
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">{message}</h5>
                    <p className="h6 text-start">
                        uid: {auth.currentUser != null & '**********'}
                        <br />
                        displayName: {' '}
                        {auth.currentUser != null && auth.currentUser.displayName}
                        <br />
                        email: {auth.currentUser != null && auth.currentUser.email}
                        <br />
                        phoneNumber: {' '}
                        {auth.currentUser != null && auth.currentUser.phoneNumber}
                        <br />
                    </p>
                </div>
            </Layout>
        </div>
    ); 
}