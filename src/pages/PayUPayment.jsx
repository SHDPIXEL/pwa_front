const payUPayment = ({ setToogle, form, hash, transactionId }) => {
    return (
        <>
            <form action="https://test.payu.in/_payment" method="post">
                <input type="hidden" name="key" value="A00Ozq" />
                <input type="hidden" name="txnid" value="transactionId" />
                <input type="hidden" name="productinfo" value={form?.productinfo} />
                <input type="hidden" name="amount" value={form?.amount} />
                <input type="hidden" name="email" value={form?.email} />
                <input type="hidden" name="firstname" value={form?.firstname} />
                <input type="hidden" name="lastname" value="" />
                <input type="hidden" name="surl" value="https://apiplayground-response.herokuapp.com/" />
                <input type="hidden" name="furl" value="https://apiplayground-response.herokuapp.com/" />
                <input type="hidden" name="phone" value="" />
                <input type="hidden" name="hash" value={hash} />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}
export default payUPayment;