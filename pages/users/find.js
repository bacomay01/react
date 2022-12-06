import { useState } from "react";
import { app } from '../../src/firebase';
import { getFirestore, collection, query, where, getDocs, orderBy, startAt, endAt } from "firebase/firestore/lite";
import Layout from "../../components/layout";
import Link from "next/link";

export default function Find() {
    const [message, setMessage] = useState('find data');
    // 検査ワード
    const [find, setFind] = useState('');
    const [data, setData] = useState([]);

    // 1. firestoreオブジェクトを取得する
    const db = getFirestore(app);

    const onChangeFind = (e) => {
        setFind(e.target.value);
    };

    // ユーザ情報を検査する
    const doAction = (e) => {
        // 2. データベースの参照先を作成する
        const dataRef = collection(db, 'mydata');
        // 3. クエリーを作成する
        const whereQuery = where('name', '==', find);
        // 4. クエリ―を含んだ拡張クエリ―を作成する
        // const executeQuery = query(dataRef, whereQuery);
        const executeQuery = query(
            dataRef,
            orderBy('name'),
            startAt(find),
            endAt(`${find}\uf8ff`)
        );
        // 5. データベースからドキュメントを検査して取得する
        getDocs(executeQuery).then((snapshot) => {
            const newData = [];
            snapshot.forEach((document) => {
                // ドキュメントのデータを取得する
                const doc = document.data();
                newData.push(
                    <tr key={document.id}>
                        <td>
                            <Link href={`/users/delete?id=${document.id}`}>
                                {document.id}
                            </Link>
                        </td>
                        <td>{doc.name}</td>
                        <td>{doc.mail}</td>
                        <td>{doc.age}</td>
                    </tr>
                );
            });
            setData(newData);
            setMessage(`find: ${find}`);
        });
    };

    return (
        <div>
            <Layout header="Next.js" title="ユーザ情報のセンサページ">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">{message}</h5>
                    <div className="text-start">
                        <div className="form-group">
                            <label htmlFor="find">Find:</label>
                            <input 
                                type="text"
                                name="find"
                                id="find"
                                className="form-control"
                                onChange={onChangeFind}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={doAction}>
                        検査
                    </button>
                </div>
                <table className="table bg-white text-start">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>{data}</tbody>
                </table>
            </Layout>
        </div>
    );
}