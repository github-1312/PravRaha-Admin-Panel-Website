import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Save, RefreshCcw, Map } from "lucide-react";
import {
	useGetContact,
	useUpdateContact,
	getMobileFromContact,
} from "../query/site-customisation/useContact";

export default function ContactManagement() {
	const {
		data: contactResponse,
		isLoading,
		error,
		refetch,
	} = useGetContact();
	const updateMutation = useUpdateContact();

	const contact = contactResponse || null;

	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [address, setAddress] = useState("");
	const [mapUrl, setMapUrl] = useState("");

	const [initialEmail, setInitialEmail] = useState("");
	const [initialMobile, setInitialMobile] = useState("");
	const [initialAddress, setInitialAddress] = useState("");
	const [initialMapUrl, setInitialMapUrl] = useState("");

	useEffect(() => {
		if (contact) {
			setEmail(contact.email || "");
			setMobile(getMobileFromContact(contact));
			setAddress(contact.address || "");
			setMapUrl(contact.mapUrl || "");

			setInitialEmail(contact.email || "");
			setInitialMobile(getMobileFromContact(contact));
			setInitialAddress(contact.address || "");
			setInitialMapUrl(contact.mapUrl || "");
		}
	}, [contact]);

	const resetForm = () => {
		setEmail(contact?.email || "");
		setMobile(getMobileFromContact(contact));
		setAddress(contact?.address || "");
		setMapUrl(contact?.mapUrl || "");
	};

	const isDirty =
		email !== initialEmail ||
		mobile !== initialMobile ||
		address !== initialAddress ||
		mapUrl !== initialMapUrl;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (!isDirty) return;
			await updateMutation.mutateAsync({ email, address, mobile, mapUrl });
			setInitialEmail(email);
			setInitialMobile(mobile);
			setInitialAddress(address);
			setInitialMapUrl(mapUrl);
		} catch (err) {
			console.error("Failed to update contact:", err);
		}
	};

	if (error) {
		return (
			<div className="max-w-3xl mx-auto p-4 sm:p-6">
				<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
					<div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
						Error Loading Contact
					</div>
					<div className="text-red-500 dark:text-red-300 mb-4 text-sm sm:text-base">
						{error.message || "Failed to load contact details"}
					</div>
					<button
						onClick={() => refetch()}
						className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
					>
						<RefreshCcw className="w-4 h-4" /> Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-3xl mx-auto p-4 sm:p-6">
			{/* Header */}
			<div className="mb-6 sm:mb-8">
				<div className="flex items-center gap-3 mb-2">
					<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
						<Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
					</div>
					<h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
						Contact Management
					</h1>
				</div>
				<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
					Manage your public contact details
				</p>
			</div>

			{/* Card */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
				{isLoading ? (
					<div className="flex items-center justify-center p-8">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						<span className="ml-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
							Loading contact details...
						</span>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email *
							</label>
							<div className="relative">
								<input
									type="email"
									placeholder="hello@company.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
									required
								/>
								<Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							</div>
						</div>

						{/* Mobile */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Mobile *
							</label>
							<div className="relative">
								<input
									type="tel"
									placeholder="+1 555 010 1234"
									value={mobile}
									onChange={(e) => setMobile(e.target.value)}
									className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
									required
								/>
								<Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							</div>
						</div>

						{/* Address */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Address *
							</label>
							<div className="relative">
								<textarea
									placeholder="123 Main St, City, Country"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									rows={4}
									className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base resize-none"
									required
								/>
								<MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
							</div>
						</div>

						{/* Map URL */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Google Map Embed URL
							</label>
							<div className="relative">
								<input
									type="url"
									placeholder="https://www.google.com/maps/embed?...etc"
									value={mapUrl}
									onChange={(e) => setMapUrl(e.target.value)}
									className="w-full pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors text-sm sm:text-base"
								/>
								<Map className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
							</div>

							{/* Map Preview */}
							{mapUrl && (
								<div className="mt-4 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
									<iframe
										src={mapUrl}
										title="Google Map"
										width="100%"
										height="250"
										style={{ border: 0 }}
										allowFullScreen
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
									></iframe>
								</div>
							)}
						</div>

						{/* Actions */}
						<div className="flex flex-col sm:flex-row gap-3 pt-2">
							{isDirty ? (
								<>
									<button
										type="submit"
										disabled={updateMutation.isPending}
										className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base"
									>
										{updateMutation.isPending ? (
											<div className="flex items-center justify-center gap-2">
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
												<span className="text-xs sm:text-sm">Saving...</span>
											</div>
										) : (
											<>
												<Save className="w-4 h-4" /> Save Changes
											</>
										)}
									</button>
									<button
										type="button"
										onClick={resetForm}
										disabled={updateMutation.isPending}
										className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base"
									>
										Reset
									</button>
								</>
							) : (
								<div className="text-sm text-gray-500 dark:text-gray-400">
									No changes to save
								</div>
							)}
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
