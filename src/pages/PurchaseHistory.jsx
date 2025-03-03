import React, { useState, useEffect } from 'react';
import { BottomNavBarMemberProgram } from '../components/BottomNavBar';
import Header from '../components/Header';
import api, { API_BASE_URL } from '../utils/Api';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { Download } from 'lucide-react';

const PurchaseHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get(`/user/invoices`);
        const invoicePaths = response.data?.invoices || [];
        setInvoices(invoicePaths);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Error fetching invoices");
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="min-h-screen text-gray-900 font-poppins bg-gray-50">
      <Header title="Purchase History" />

      <div className="px-4 py-4 pb-24">
        {loading ? (
          <Loader />
        ) : invoices.length > 0 ? (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Your Invoices</h2>
              <p className="text-sm text-gray-500">Download your purchase invoices</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-md flex items-center justify-between border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Download size={20} className="text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Invoice {index + 1}</span>
                  </div>
                  <a
                    href={`${API_BASE_URL}${invoice}`}
                    download
                    className="text-white bg-[#F7941C] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e6831a] transition-all"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-sm text-center">No invoices available</p>
          </div>
        )}
      </div>

      <BottomNavBarMemberProgram />
    </div>
  );
};

export default PurchaseHistory;
