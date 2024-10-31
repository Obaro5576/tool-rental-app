import { NextResponse } from 'next/server';
import tools from '../../../data/tools.json'; 
import toolRentalCharges from '../../../data/toolRentalCharges.json'; 

interface RentalData {
    toolCode: string;
    checkoutDate: string;
    returnDate: string;
    discountPercent: number;
}

interface RentalAgreement {
    toolCode: string;
    checkoutDate: string;
    returnDate: string;
    discountPercent: number;
    chargeableDays: number;
    dailyCharge: number;
    prediscountAmount: number;
    discountAmount: number;
    finalAmount: number;
}

function calculateChargeableDays(checkoutDate: Date, returnDate: Date, toolType: string): number {
    let chargeableDays = 0;
    const holidays = [
        new Date(checkoutDate.getFullYear(), 6, 4), // Independence Day
        new Date(checkoutDate.getFullYear(), 8, 1) // Labor Day (first Monday of September)
    ];
    
    for (let date = new Date(checkoutDate); date < returnDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
        const isHoliday = holidays.some(holiday => holiday.getTime() === date.getTime());
        
        if (toolType === 'ladder' || (toolType === 'chainsaw' && !isWeekend) || (toolType === 'jackhammer' && !isHoliday)) {
            chargeableDays++;
        }
    }
    
    return chargeableDays;
}

export async function POST(request: Request) {
    const rentalData = await request.json() as RentalData; // Cast to RentalData

    // Validate rental data
    if (!rentalData.toolCode || !rentalData.checkoutDate || !rentalData.returnDate) {
        return NextResponse.json({ error: "Missing required rental information." }, { status: 400 });
    }

    const tool = tools.find(t => t.code === rentalData.toolCode);
    const rentalCharge = toolRentalCharges.find(tc => tc.type === tool?.type); 

    if (!tool || !rentalCharge) {
        return NextResponse.json({ error: 'Invalid tool code or type.' }, { status: 400 });
    }

    const checkoutDate = new Date(rentalData.checkoutDate);
    const returnDate = new Date(rentalData.returnDate);

    // Validate the checkout and return dates
    if (checkoutDate >= returnDate) {
        return NextResponse.json({ error: 'Checkout date must be before return date.' }, { status: 400 });
    }
    
    if (rentalData.discountPercent < 0 || rentalData.discountPercent > 110) {
        return NextResponse.json({ error: 'Discount percent must be between 0 and 110.' }, { status: 400 });
    }
    

    // Calculate the rental agreement values
    const chargeableDays = calculateChargeableDays(checkoutDate, returnDate, tool.type);
    const dailyCharge = rentalCharge.dailyCharge;
    const prediscountAmount = chargeableDays * dailyCharge;
    const discountAmount = (rentalData.discountPercent / 100) * prediscountAmount;
    const finalAmount = prediscountAmount - discountAmount;

    const rentalAgreement: RentalAgreement = {
        toolCode: rentalData.toolCode,
        checkoutDate: rentalData.checkoutDate,
        returnDate: rentalData.returnDate,
        discountPercent: rentalData.discountPercent,
        chargeableDays: chargeableDays,
        dailyCharge: dailyCharge,
        prediscountAmount: parseFloat(prediscountAmount.toFixed(2)),
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        finalAmount: parseFloat(finalAmount.toFixed(2)),
    };

    return NextResponse.json(rentalAgreement);
}