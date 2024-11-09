import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const MandatPage = () => {
    const location = useLocation()
    const [infos, setInfos] = useState(location?.state);

    useEffect(() => {
        console.log('the params get::::', location.state);
        setInfos(location.state)
    }, [])

    return (
        <div className="mandate-form">
            <h2>Mandat de prélèvement</h2>
            <p>En signant ce formulaire de mandat, vous autorisez (A) à envoyer des instructions à votre banque pour débiter votre compte, et (B) votre banque à débiter votre compte conformément aux instructions de.</p>
            <p>Vous bénéficiez du droit d’être remboursé par votre banque suivant les conditions décrites dans la convention que vous avez passée avec elle...</p>

            <form>
                {/* Reference Section */}
                <div className="form-row">
                    <label>Référence unique du mandat :</label>
                    <input type="text" className="reference-input" defaultValue={"2544582666"} />
                </div>

                {/* Debiteur Information */}
                <div className="form-section">
                    <h4>Débiteur :</h4>
                    <div className="form-row">
                        <label>Votre Nom:</label>
                        <input
                            type="text"
                            defaultValue={infos.item.firstName + " " + infos.item.lastName}
                        />
                    </div>
                    <div className="form-row">
                        <label>Votre Adresse:</label>
                        <input type="text" defaultValue={`${infos.item.email}`} />
                    </div>
                    <div className="form-row">
                        <label>Code postal:</label>
                        <input type="text" defaultValue={"10000"} />
                        <label>Ville:</label>
                        <input type="text" defaultValue={"Casa"} />
                    </div>
                    <div className="form-row">
                        <label>Pays:</label>
                        <input type="text" defaultValue={"Morocco"} />
                    </div>
                    <div className="form-row">
                        <label>IBAN:</label>
                        <input type="text" className="iban-input" defaultValue={infos.item.rib} />
                    </div>
                    <div className="form-row">
                        <label>BIC:</label>
                        <input type="text" className="bic-input" />
                    </div>
                </div>

                {/* Créancier Information */}
                <div className="form-section">
                    <h4>Identifiant créancier :</h4>
                    <div className="form-row">
                        <label>Nom:</label>
                        <input type="text" />
                    </div>
                    <div className="form-row">
                        <label>Adresse:</label>
                        <input type="text" />
                    </div>
                    <div className="form-row">
                        <label>Code postal:</label>
                        <input type="text" />
                        <label>Ville:</label>
                        <input type="text" />
                    </div>
                    <div className="form-row">
                        <label>Pays:</label>
                        <input type="text" />
                    </div>
                </div>

                {/* Payment Section */}
                <div className="form-row">
                    <label>Paiement :</label>
                    <label>
                        <input type="checkbox" /> Récurrent/Répétitif
                    </label>
                    <label>
                        <input type="checkbox" /> Ponctuel
                    </label>
                </div>

                {/* Signature Section */}
                <div className="form-row">
                    <label>A :</label>
                    <input type="text" />
                </div>
                <div className="form-row">
                    <label>Signature :</label>
                    <input type="text" className="signature-input" />
                </div>
            </form>
            <p>Nota : Vos droits concernant le présent mandat sont expliqués dans un document que vous pouvez obtenir auprès de votre banque.</p>
            <p>Veuillez compléter tous les champs du mandat.</p>
        </div>
    )
}