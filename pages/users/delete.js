/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { app } from '../../src/firebase';
import { getFirestore, deleteDoc, getDoc, doc } from 'firebase/firestore/lite';
import Layout from '../../components/layout';

export default function Delete(props) {
  const [message, setMessage] = useState('wait.');
  const [data, setData] = useState(null);
  const router = useRouter();

  // 1.firestoreオブジェクトを取得する
  const db = getFirestore(app);

  useEffect(() => {
    // クエリパラメーターにidがあるか確認する
    if (router.query.id != undefined) {
      // データベースの参照先を作成する
      const dataRef = doc(db, 'mydata', router.query.id);
      // データベースからドキュメントを取得する
      getDoc(dataRef).then((document) => {
        // ドキュメントのデータを取得する
        setData(document.data());
      });
    } else {
      setMessage(`${message}.`);
    }
  }, [message]);

  const doAction = (e) => {
    // 2.データベースの参照先を作成する
    const dataRef = doc(db, 'mydata', router.query.id);
    // 3.データベースからドキュメントを削除する
    deleteDoc(dataRef).then((_) => {
      router.push('/users');
    });
  };

  return (
    <div>
      <Layout header="Next.js" title="ユーザ情報の削除ページ">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">{message}</h5>
          <pre className="card p-3 m-3 h5 text-start">
            Name: {data != null ? data.name : '...'}
            <br />
            Mail: {data != null ? data.mail : '...'}
            <br />
            Age: {data != null ? data.age : '...'}
          </pre>
          <button className="btn btn-primary" onClick={doAction}>
            Delete
          </button>
        </div>
      </Layout>
    </div>
  );
}