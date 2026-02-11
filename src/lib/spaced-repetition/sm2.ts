/**
 * SM-2 (SuperMemo 2) Spaced Repetition Algorithm
 * 
 * This algorithm calculates the optimal interval for reviewing information
 * based on the user's performance (confidence/quality of response).
 * 
 * Quality (0-5):
 * 0 - Complete blackout
 * 1 - Incorrect response, correct one remembered
 * 2 - Incorrect response, correct one seemed easy to recall
 * 3 - Correct response with serious difficulty
 * 4 - Correct response with hesitation
 * 5 - Perfect response
 */

export interface SM2Result {
    interval: number;      // Days until next review
    easeFactor: number;    // Easiness factor for future calculations
    reviewCount: number;   // Number of times reviewed
    nextReview: Date;      // Next review date
}

export interface SM2Input {
    quality: number;       // 0-5 quality of response
    previousInterval: number;
    previousEaseFactor: number;
    reviewCount: number;
}

/**
 * Calculate next review using SM-2 algorithm
 */
export function calculateSM2(input: SM2Input): SM2Result {
    const { quality, previousInterval, previousEaseFactor, reviewCount } = input;

    // Quality must be between 0 and 5
    const q = Math.max(0, Math.min(5, quality));

    // Calculate new ease factor
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    let newEaseFactor = previousEaseFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));

    // Ease factor should not be less than 1.3
    newEaseFactor = Math.max(1.3, newEaseFactor);

    // Calculate interval
    let newInterval: number;
    const newReviewCount = reviewCount + 1;

    if (q < 3) {
        // If quality is less than 3, start over
        newInterval = 1;
    } else {
        if (newReviewCount === 1) {
            newInterval = 1;
        } else if (newReviewCount === 2) {
            newInterval = 6;
        } else {
            // I(n) = I(n-1) * EF
            newInterval = Math.round(previousInterval * newEaseFactor);
        }
    }

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + newInterval);

    return {
        interval: newInterval,
        easeFactor: newEaseFactor,
        reviewCount: q < 3 ? 0 : newReviewCount, // Reset count if quality is low
        nextReview,
    };
}

/**
 * Map confidence level (1-5) to SM-2 quality (0-5)
 * This allows the frontend to use a simpler 1-5 confidence scale
 */
export function confidenceToQuality(confidence: number): number {
    // Confidence 1 = Quality 0-1 (very poor)
    // Confidence 2 = Quality 2 (poor)
    // Confidence 3 = Quality 3 (good with difficulty)
    // Confidence 4 = Quality 4 (good)
    // Confidence 5 = Quality 5 (perfect)

    const mapping: Record<number, number> = {
        1: 0,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
    };

    return mapping[confidence] ?? 3;
}

/**
 * Get initial SM-2 values for a new question
 */
export function getInitialSM2Values(): Omit<SM2Result, 'nextReview'> & { nextReview: Date | null } {
    return {
        interval: 0,
        easeFactor: 2.5, // Default ease factor
        reviewCount: 0,
        nextReview: null,
    };
}
