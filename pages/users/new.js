import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/layout';
import{ app } from '../../src/firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

export default function Add() {
    const [message, setMessage] = useState('add data');
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [age, setAge] = useState(0);
    const router = useRouter();

    // 1. firestoreオブジェクトを取得する
    const db = getFirestore(app);
    const onChangeName = (e) => {
        setName(e.target.value);
    };
    const onChangeMail = (e) => {
        setMail(e.target.value);
    };
    const onChangeAge = (e) => {
        setAge(e.target.value);
    };

    // ユーザ情報を追加する
    const doAction = (e) => {
        const newData = {
            name: name,
            mail: mail,
            age: age,
        };

        // 2. データベースの参照先を作成する
        const dataRef = collection(db, ('mydata'));
        // 3. データベースにドキュメントを追加する
        addDoc(dataRef, newData).then((_) => {
            router.push('/users');
        });
    };

    return (
        <div>
            <Layout header="Next.js" title="ユーザ情報の追加ページ">
                <div className="alert alert-priamry text-center">
                    <h5 className="mb-4">{message}</h5>
                    <div className="text-start">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                onChange={onChangeName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mail">Mail:</label>
                            <input 
                                type="text"
                                name="mail"
                                id="mail"
                                className="form-control"
                                onChange={onChangeMail}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input 
                                type="number"
                                name="age"
                                id="age"
                                className="form-control"
                                onChange={onChangeAge}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={doAction}>
                        追加
                    </button>
                </div>
            </Layout>
        </div>
    );
}